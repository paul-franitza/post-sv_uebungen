// filter.js – filtert die Übungskarten nach Block, Stichwort, Spielerzahl und Suchtext.
// Stand wird in der URL gespeichert (?stichwort=annahme&spieler=8), damit man Links teilen kann.
(function () {
  'use strict';

  var boxes = Array.prototype.slice.call(document.querySelectorAll('#uebungsliste .post-box'));
  if (!boxes.length) return;

  var tagButtons = Array.prototype.slice.call(document.querySelectorAll('#tag-buttons .tag-button'));
  var blockButtons = Array.prototype.slice.call(document.querySelectorAll('#block-buttons .block-button'));
  var searchInput = document.getElementById('search-input');
  var playersInput = document.getElementById('players-input');
  var resetButton = document.getElementById('filter-reset');
  var resultsCount = document.getElementById('results-count');
  var noHits = document.getElementById('keine-treffer');

  var state = { tags: [], blocks: [], players: null, text: '' };

  // --- Zustand aus der URL lesen -------------------------------------------
  function readUrl() {
    var params = new URLSearchParams(window.location.search);
    var sw = params.get('stichwort');
    if (sw) state.tags = sw.split(',').filter(Boolean);
    var bl = params.get('block');
    if (bl) state.blocks = bl.split(',').filter(Boolean);
    var sp = parseInt(params.get('spieler'), 10);
    if (sp > 0) state.players = sp;
    var q = params.get('suche');
    if (q) state.text = q;
  }

  function writeUrl() {
    var params = new URLSearchParams();
    if (state.tags.length) params.set('stichwort', state.tags.join(','));
    if (state.blocks.length) params.set('block', state.blocks.join(','));
    if (state.players) params.set('spieler', state.players);
    if (state.text) params.set('suche', state.text);
    var qs = params.toString();
    var url = window.location.pathname + (qs ? '?' + qs : '');
    window.history.replaceState(null, '', url);
  }

  // --- Anzeige ---------------------------------------------------------------
  function syncButtons() {
    tagButtons.forEach(function (b) {
      b.classList.toggle('active', state.tags.indexOf(b.getAttribute('data-tag')) !== -1);
    });
    blockButtons.forEach(function (b) {
      b.classList.toggle('active', state.blocks.indexOf(b.getAttribute('data-block')) !== -1);
    });
    if (searchInput) searchInput.value = state.text;
    if (playersInput) playersInput.value = state.players || '';
  }

  function matches(box) {
    var tags = (box.getAttribute('data-tags') || '').split(/\s+/).filter(Boolean);
    // Alle gewählten Stichworte müssen vorkommen.
    for (var i = 0; i < state.tags.length; i++) {
      if (tags.indexOf(state.tags[i]) === -1) return false;
    }
    if (state.blocks.length && state.blocks.indexOf(box.getAttribute('data-block')) === -1) return false;
    if (state.players) {
      var min = parseInt(box.getAttribute('data-min'), 10) || 1;
      var max = parseInt(box.getAttribute('data-max'), 10) || 99;
      if (state.players < min || state.players > max) return false;
    }
    if (state.text) {
      var hay = (box.getAttribute('data-title') + ' ' + box.textContent).toLowerCase();
      if (hay.indexOf(state.text.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function apply() {
    var n = 0;
    boxes.forEach(function (box) {
      var ok = matches(box);
      box.hidden = !ok;
      if (ok) n++;
      // gewählte Stichworte auf der Karte hervorheben
      Array.prototype.forEach.call(box.querySelectorAll('.post-tag'), function (el) {
        el.classList.toggle('highlight', state.tags.indexOf(el.getAttribute('data-tag')) !== -1);
      });
    });
    var filtered = state.tags.length || state.blocks.length || state.players || state.text;
    if (resultsCount) {
      resultsCount.textContent = filtered
        ? (n === 1 ? '1 Übung passt' : n + ' Übungen passen')
        : 'Alle ' + n + ' Übungen';
    }
    if (noHits) noHits.hidden = n > 0;
    syncButtons();
    writeUrl();
  }

  // --- Ereignisse -------------------------------------------------------------
  function toggle(list, value) {
    var i = list.indexOf(value);
    if (i === -1) list.push(value); else list.splice(i, 1);
  }

  tagButtons.forEach(function (b) {
    b.addEventListener('click', function () { toggle(state.tags, b.getAttribute('data-tag')); apply(); });
  });
  blockButtons.forEach(function (b) {
    b.addEventListener('click', function () { toggle(state.blocks, b.getAttribute('data-block')); apply(); });
  });

  var timer;
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { state.text = searchInput.value.trim(); apply(); }, 200);
    });
  }
  if (playersInput) {
    playersInput.addEventListener('input', function () {
      var v = parseInt(playersInput.value, 10);
      state.players = v > 0 ? v : null;
      apply();
    });
  }
  if (resetButton) {
    resetButton.addEventListener('click', function () {
      state = { tags: [], blocks: [], players: null, text: '' };
      apply();
    });
  }

  readUrl();
  apply();
})();
