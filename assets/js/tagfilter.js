// tagfilter.js - Tag filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const tagButtons = document.querySelectorAll('.tag-button');
  const postBoxes = document.querySelectorAll('.post-box');
  const activeTags = new Set(['all']);

  // Initial state - all posts visible
  updateVisibility();

  // Add click event to all tag buttons
  tagButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tag = this.getAttribute('data-tag');

      // Toggle active class
      this.classList.toggle('active');

      // Handle the "All" tag specially
      if (tag === 'all') {
        if (this.classList.contains('active')) {
          // If "All" is activated, deactivate all other tags
          tagButtons.forEach(btn => {
            if (btn.getAttribute('data-tag') !== 'all') {
              btn.classList.remove('active');
            }
          });
          activeTags.clear();
          activeTags.add('all');
        } else {
          // If "All" is deactivated and no other tags are active, reactivate it
          if (activeTags.size === 0 ||
              (activeTags.size === 1 && activeTags.has('all'))) {
            this.classList.add('active');
            activeTags.add('all');
          }
        }
      } else {
        // When clicking a specific tag
        if (this.classList.contains('active')) {
          // Add tag to active set
          activeTags.add(tag);
          // Deactivate "All" button if it was active
          const allButton =
              document.querySelector('.tag-button[data-tag="all"]');
          if (allButton.classList.contains('active')) {
            allButton.classList.remove('active');
            activeTags.delete('all');
          }
        } else {
          // Remove tag from active set
          activeTags.delete(tag);
          // If no tags are active, activate "All" button
          if (activeTags.size === 0) {
            const allButton =
                document.querySelector('.tag-button[data-tag="all"]');
            allButton.classList.add('active');
            activeTags.add('all');
          }
        }
      }

      // After changing tags, update visibility
      updateVisibility();

      // Apply search filter if active
      if (window.applyWordSearch &&
          typeof window.applyWordSearch === 'function') {
        window.applyWordSearch();
      }
    });
  });

  // Make updateVisibility and getActiveTags available globally
  window.updateTagVisibility = updateVisibility;
  window.getActiveTags = function() {
    return activeTags;
  };

  function updateVisibility() {
    // Show all posts if "All" is active
    if (activeTags.has('all')) {
      postBoxes.forEach(box => {
        box.classList.remove('tag-hidden');
      });
      return;
    }

    // Otherwise filter posts by active tags
    postBoxes.forEach(box => {
      const postTags = box.getAttribute('data-tags').trim().split(' ');

      // Show post only if it contains ALL selected tags
      const shouldShow =
          Array.from(activeTags).every(tag => postTags.includes(tag));
      if (shouldShow) {
        box.classList.remove('tag-hidden');
      } else {
        box.classList.add('tag-hidden');
      }
    });

    // Update results count if word search is not active
    if (!document.getElementById('search-input') ||
        document.getElementById('search-input').value.trim() === '') {
      updateResultsCount();
    }
  }

  // Highlight matching tags in post boxes
  function highlightMatchingTags() {
    if (activeTags.has('all')) {
      // No highlighting needed when all posts are shown
      document.querySelectorAll('.post-tag').forEach(tag => {
        tag.classList.remove('highlight');
      });
      return;
    }

    document.querySelectorAll('.post-box').forEach(box => {
      const postTagElements = box.querySelectorAll('.post-tag');
      postTagElements.forEach(tagEl => {
        if (activeTags.has(tagEl.textContent)) {
          tagEl.classList.add('highlight');
        } else {
          tagEl.classList.remove('highlight');
        }
      });
    });
  }

  function updateResultsCount() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
      const visibleCount =
          document.querySelectorAll('.post-box:not(.tag-hidden)').length;
      resultsCount.textContent = visibleCount === 1 ?
          '1 Ergebnis gefunden' :
          `${visibleCount} Ergebnisse gefunden`;
    }
  }

  // Update tag highlighting when visibility changes
  const originalUpdateVisibility = updateVisibility;
  updateVisibility = function() {
    originalUpdateVisibility();
    highlightMatchingTags();
    return;
  };

  // Initial highlighting
  highlightMatchingTags();
});