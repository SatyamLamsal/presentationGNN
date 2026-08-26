/* =====================================================================
   Presentation engine: slide navigation, speaker notes, overview grid,
   auto-generated footers, and 16:9 stage scaling.
   ===================================================================== */
(function () {
  const slides = [...document.querySelectorAll('.slide')];
  const stage = document.getElementById('stage');
  const prog = document.getElementById('prog');
  const notesPanel = document.getElementById('notesPanel');
  const notesList = document.getElementById('notesList');
  const overview = document.getElementById('overview');
  const ovGrid = document.getElementById('ovGrid');
  let i = 0;

  /* ---------- slide metadata: title (for overview) + speaker notes ---------- */
  const META = [
    { t: 'Cover', notes: [
      'Greet the panel; introduce both presenters and the supervisor.',
      "State the one-line hook: false claims spread differently than the truth." ] },
    { t: 'Presentation Outline', notes: [
      'Quickly preview the 8-part flow — motivation through conclusion.',
      'Sets expectations for pacing; don\u2019t linger here.' ] },
    { t: 'Divider — Motivation', notes: [
      'Transition slide — pause briefly, then move into objectives.' ] },
    { t: 'Project Objectives', notes: [
      'General objective = integrate content + propagation structure.',
      "Walk the four specific objectives briefly — don't over-explain yet." ] },
    { t: 'Twitter15 Dataset', notes: [
      '1,490 events, four roughly balanced classes.',
      "Point at the reply-chain visual to make \u201cpropagation\u201d concrete." ] },
    { t: 'The Core Challenge', notes: [
      'Emphasize: this ONE fact drives every design decision that follows.',
      'Absence of reply text is why source-text + structure alone limits accuracy.',
      "Bridge to next slide: \u201cso how did we still get through?\u201d" ] },
    { t: 'GCN vs GAT', notes: [
      'Use the democracy vs meritocracy analogy — it is memorable.',
      "State each operator's weakness honestly before introducing the hybrid." ] },
    { t: 'Divider — Proposed Method', notes: [
      'Transition — this is the centerpiece section, build a little anticipation.' ] },
    { t: 'ASAG — Adaptive Fusion', notes: [
      'This is the centerpiece slide — slow down here.',
      'Walk left to right: GCN output, GAT output, the gate, the fused result.',
      'Point at the equation only after the visual makes intuitive sense.' ] },
    { t: 'How the Gate Learns', notes: [
      "Preempt \u201cis this new?\u201d with the honest framing note yourself.",
      'Gradient \u221d difference between branches — that is WHY it learns correctly.',
      'Gate starts near 0.38 (biased toward safe GCN) — shows deliberate design.' ] },
    { t: 'Overall Architecture', notes: [
      'Point to each column left-to-right: input, encoders, backbones, fusion, prediction.',
      'ASAG box is the one to linger on — it is the novel contribution.' ] },
    { t: 'Features & Constraints', notes: [
      '16 node + 12 graph features = how we replaced the missing text.',
      'Emphasize: everything is derived only from tree files, nothing external.' ] },
    { t: 'Training Setup & Parameters', notes: [
      'Reference this slide if asked \u201cwhy these hyperparameters?\u201d',
      'Hybrid uses a smaller batch / gentler LR since it runs both branches.' ] },
    { t: 'Evaluation Metrics', notes: [
      'Explain why macro-F1 over raw accuracy — class imbalance matters.',
      'Mention the mean \u00b1 std over 5 folds reporting protocol.' ] },
    { t: 'Divider — Results', notes: [
      'Transition into the numbers — build a little suspense before revealing.' ] },
    { t: 'Results', notes: [
      'State headline numbers clearly: 81.1% accuracy / 81.1% macro-F1.',
      'Point out the hardest class (Unverified) and why — inherently ambiguous.',
      'Low std \u21d2 reliable result, not a lucky fold.' ] },
    { t: 'Comparative Analysis', notes: [
      'Same features across GCN / GAT / Hybrid — a fair, controlled comparison.',
      "State the \u201chonest ceiling\u201d note yourself before the panel raises it." ] },
    { t: 'Conclusion', notes: [
      'Summarize the three achievements in one breath each.',
      'End on the pull-quote — let it land, then pause before future work.' ] },
    { t: 'Future Work', notes: [
      'Shows awareness of limitations — a strength, not a weakness, to admit these.',
      'Close by re-affirming the objectives were met.' ] },
    { t: 'References', notes: [
      'Quick nod to key papers — shows grounding in the literature.',
      'Full bibliography (17 refs) is available in the written report.' ] },
    { t: 'Thank You / Q&A', notes: [
      'Invite questions; thank the panel and supervisor by name.' ] },
  ];

  /* ---------- fit 1280x720 stage to viewport ---------- */
  function fit() {
    const s = Math.min(innerWidth / 1280, innerHeight / 720);
    stage.style.transform = `scale(${s})`;
  }

  /* ---------- footers ---------- */
  function ensureFooter(slide, idx) {
    if (idx === 0) return; // cover has its own layout, no footer
    let f = slide.querySelector('.foot');
    if (!f) {
      f = document.createElement('div');
      f.className = 'foot';
      f.innerHTML = `<span class="brand"><img src="assets/tu_logo.png" alt="TU"/> Pulchowk Campus · IOE</span>
        <span class="spacer"></span>
        <span>Hybrid GCN–GAT · Rumor Detection</span>
        <span class="spacer"></span>
        <span class="pageno"></span>`;
      slide.appendChild(f);
    }
    f.querySelector('.pageno').textContent = (idx + 1) + ' / ' + slides.length;
  }

  /* ---------- speaker notes ---------- */
  function renderNotes(idx) {
    const notes = (META[idx] && META[idx].notes) || [];
    notesList.innerHTML = notes.map(n => `<li>${n}</li>`).join('') || '<li>(no notes for this slide)</li>';
  }

  /* ---------- overview grid (built once) ---------- */
  function buildOverview() {
    ovGrid.innerHTML = META.map((m, k) => `
      <div class="ov-item" data-idx="${k}">
        <div class="n">${String(k + 1).padStart(2, '0')} / ${slides.length}</div>
        <div class="t">${m.t}</div>
      </div>`).join('');
    ovGrid.querySelectorAll('.ov-item').forEach(el => {
      el.addEventListener('click', () => {
        show(parseInt(el.dataset.idx, 10));
        closeOverview();
      });
    });
  }
  function openOverview() { overview.classList.add('open'); }
  function closeOverview() { overview.classList.remove('open'); }
  function toggleOverview() { overview.classList.toggle('open'); }

  /* ---------- navigation ---------- */
  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach((s, k) => {
      s.classList.toggle('active', k === i);
      s.classList.remove('in');
    });
    ensureFooter(slides[i], i);
    const cur = slides[i];
    void cur.offsetWidth;               // reflow, so entrance animation restarts
    requestAnimationFrame(() => cur.classList.add('in'));
    prog.style.width = (i / (slides.length - 1) * 100) + '%';
    renderNotes(i);
  }
  function next() { show(i + 1); }
  function prev() { show(i - 1); }

  function initFromHash() {
    const m = location.hash.match(/^#(\d+)$/);
    return m ? Math.max(0, Math.min(slides.length - 1, parseInt(m[1], 10) - 1)) : 0;
  }

  /* ---------- keyboard ---------- */
  addEventListener('keydown', (e) => {
    if (overview.classList.contains('open')) {
      if (e.key === 'Escape' || e.key === 'o' || e.key === 'O') { closeOverview(); }
      return;
    }
    if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); prev(); }
    else if (e.key === 'Home') { show(0); }
    else if (e.key === 'End') { show(slides.length - 1); }
    else if (e.key === 'f' || e.key === 'F') {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }
    else if (e.key === 'n' || e.key === 'N') { notesPanel.classList.toggle('open'); }
    else if (e.key === 'o' || e.key === 'O') { toggleOverview(); }
  });

  /* ---------- click to advance (skip clicks on notes/overview/help) ---------- */
  addEventListener('click', (e) => {
    if (e.target.closest('#help') || e.target.closest('#notesPanel') || e.target.closest('#overview')) return;
    (e.clientX > innerWidth * 0.35) ? next() : prev();
  });

  addEventListener('resize', fit);

  buildOverview();
  fit();
  show(initFromHash());
})();
