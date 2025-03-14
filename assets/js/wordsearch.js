// word-search.js - A simple word-based search for Jekyll posts with sorting
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const clearButton = document.getElementById('clear-search');
  const postBoxes = document.querySelectorAll('.post-box');
  const resultsCount = document.getElementById('results-count');

  // Add sort button to the DOM
  addSortButton();

  // Initialize results count
  if (resultsCount && !resultsCount.textContent) {
    updateResultsCount(postBoxes.length);
  }

  // Add event listeners
  if (searchInput) {
    // Execute search on input change (with debounce)
    let debounceTimeout;
    searchInput.addEventListener('input', function() {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(function() {
        performSearch();
      }, 300);  // Wait 300ms after user stops typing
    });

    // Execute search when Enter key is pressed
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  // Execute search when search button is clicked
  if (searchButton) {
    searchButton.addEventListener('click', performSearch);
  }

  // Clear search results when clear button is clicked
  if (clearButton) {
    clearButton.addEventListener('click', function() {
      if (searchInput) {
        searchInput.value = '';
      }
      resetSearch();
    });
  }

  // Make search function available globally
  window.applyWordSearch = performSearch;

  // Main search function
  function performSearch() {
    if (!searchInput) return;

    const searchTerm = searchInput.value.trim().toLowerCase();

    // If search term is empty, show all posts (subject to tag filtering)
    if (searchTerm === '') {
      resetSearch();
      return;
    }

    // First apply tag filtering if available
    if (window.updateTagVisibility &&
        typeof window.updateTagVisibility === 'function') {
      window.updateTagVisibility();
    }

    // Filter posts based on search term (only considering posts not hidden by
    // tags)
    let matchCount = 0;

    postBoxes.forEach(box => {
      // Skip if hidden by tag filtering
      if (box.classList.contains('tag-hidden')) {
        return;
      }

      const title = box.querySelector('h2').textContent.toLowerCase();
      const description = box.querySelector('p').textContent.toLowerCase();

      // Check if title or description contains the search term
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        box.classList.remove('search-hidden');
        // Highlight the matching text
        highlightMatches(box, searchTerm);
        matchCount++;
      } else {
        box.classList.add('search-hidden');
      }
    });

    // Update results count
    updateResultsCount(matchCount);
  }

  // Function to highlight matching text
  function highlightMatches(postBox, searchTerm) {
    // Remove any existing highlights first
    removeHighlights(postBox);

    // Elements to highlight within
    const title = postBox.querySelector('h2');
    const description = postBox.querySelector('p');

    // Highlight matches in title
    if (title) {
      title.innerHTML = highlightText(title.textContent, searchTerm);
    }

    // Highlight matches in description
    if (description) {
      description.innerHTML =
          highlightText(description.textContent, searchTerm);
    }
  }

  // Helper function to highlight specific text
  function highlightText(text, term) {
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  }

  // Helper function to escape special regex characters
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Remove highlights
  function removeHighlights(element) {
    const title = element.querySelector('h2');
    const description = element.querySelector('p');

    if (title && title.innerHTML.includes('search-highlight')) {
      title.innerHTML = title.textContent;
    }

    if (description && description.innerHTML.includes('search-highlight')) {
      description.innerHTML = description.textContent;
    }
  }

  // Reset search to show all posts (subject to tag filtering)
  function resetSearch() {
    postBoxes.forEach(box => {
      box.classList.remove('search-hidden');
      removeHighlights(box);
    });

    // Apply tag filtering if available
    if (window.updateTagVisibility &&
        typeof window.updateTagVisibility === 'function') {
      window.updateTagVisibility();
    } else {
      // Update results count if tag filtering is not available
      const visibleCount =
          document
              .querySelectorAll(
                  '.post-box:not(.search-hidden):not(.tag-hidden)')
              .length;
      updateResultsCount(visibleCount);
    }
  }

  // Update the results count element
  function updateResultsCount(count) {
    if (resultsCount) {
      resultsCount.textContent =
          count === 1 ? '1 Ergebnis gefunden' : `${count} Ergebnisse gefunden`;
    }
  }

  // Modify the addSortButton function in your word-search.js file
  function addSortButton() {
    // Instead of creating a new sort button if it's in the HTML, just find it
    let sortButton = document.getElementById('sort-button');
    let sortIcon = document.getElementById('sort-icon');

    // If the button doesn't exist in the HTML (backward compatibility), create
    // it
    if (!sortButton) {
      // Find the sort button wrapper - it should already exist in your HTML
      const sortButtonWrapper = document.querySelector('.sort-button-wrapper');

      // If the wrapper doesn't exist, we need to create everything
      if (!sortButtonWrapper) {
        // Find the search controls container
        const searchControls = document.querySelector('.search-controls');

        // If we can't find it, try to adapt to the old structure
        if (!searchControls) {
          // Old code for backward compatibility
          const searchContainer = searchInput?.parentElement;
          if (!searchContainer) return;

          // Create sort button wrapper
          const newSortButtonWrapper = document.createElement('div');
          newSortButtonWrapper.className = 'sort-button-wrapper';

          // Create sort button
          sortButton = document.createElement('button');
          sortButton.id = 'sort-button';
          sortButton.className = 'sort-button';
          sortButton.setAttribute('aria-label', 'Sort order');

          // Create sort icon/text
          sortIcon = document.createElement('span');
          sortIcon.id = 'sort-icon';
          sortIcon.textContent = 'A-Z';

          // Assemble button
          sortButton.appendChild(sortIcon);
          newSortButtonWrapper.appendChild(sortButton);

          // Add the button after the search input wrapper
          searchContainer.parentNode.insertBefore(
              newSortButtonWrapper, searchContainer.nextSibling);
        }
      }
    }

    // Set up sort functionality
    setupSorting(sortButton, sortIcon);
  }

  // Function to setup sorting functionality
  function setupSorting(sortButton, sortIcon) {
    if (!sortButton || !sortIcon) return;

    let isAscending = true;  // Default is A-Z

    // Function to sort posts
    function sortPosts() {
      // Find the container that holds all the post boxes
      const postContainer = postBoxes[0]?.parentElement;
      if (!postContainer || postBoxes.length === 0) return;

      // Get all posts as an array for sorting
      const posts = Array.from(postBoxes);

      // Sort the posts based on title
      posts.sort((a, b) => {
        const titleA = a.querySelector('h2')?.textContent.toLowerCase() || '';
        const titleB = b.querySelector('h2')?.textContent.toLowerCase() || '';

        if (isAscending) {
          return titleA.localeCompare(titleB);
        } else {
          return titleB.localeCompare(titleA);
        }
      });

      // Reinsert the sorted posts
      posts.forEach(post => {
        postContainer.appendChild(post);
      });
    }

    // Add click event to sort button
    sortButton.addEventListener('click', function() {
      isAscending = !isAscending;

      // Update button text
      sortIcon.textContent = isAscending ? 'A-Z' : 'Z-A';

      // Sort the posts
      sortPosts();
    });

    // Initial sort (A-Z)
    sortPosts();
  }
});
