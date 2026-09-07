<div class="games-grid">
  <div class="game-cell">
    <div class="game-cell-top">
      <a href="001-ua-varieties-of-coffee-pt1/">Coffee varieties</a>
      <small class="game-status">(pt. 1–2, UA/RU)</small>
    </div>
    <p class="game-desc">species vs varieties: typica, bourbon, geisha, and how new cultivars appear</p>
  </div>
  <div class="game-cell">
    <div class="game-cell-top">
      <a href="013-ua-espresso-pt2/">Espresso experiments</a>
      <small class="game-status">(history + brew notes)</small>
    </div>
    <p class="game-desc">espresso history, drink variations, and practical extraction / recipe tuning</p>
  </div>
  <div class="game-cell">
    <div class="game-cell-top">
      <a href="019-ua-tds/">TDS &amp; water</a>
      <small class="game-status">(lab-style notes)</small>
    </div>
    <p class="game-desc">extraction, TDS, and how water chemistry changes the cup</p>
  </div>
  <div class="game-cell">
    <div class="game-cell-top">
      <a href="002-ru-making-coffee/">Brewing basics</a>
      <small class="game-status">(methods &amp; variables)</small>
    </div>
    <p class="game-desc">freshness, grind, water, gear cleanliness — the levers before any recipe</p>
  </div>
</div>

<style>
.games-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 20px;
  margin: 0 0 0.75rem;
  overflow: visible;
}
@media (max-width: 720px) {
  .games-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
.game-cell {
  position: relative;
  z-index: 1;
  overflow: visible;
}
.game-cell-top {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
}
.game-cell-top a {
  color: var(--color-primary);
  font-style: italic;
  text-decoration: underline dashed;
  text-decoration-color: var(--color-primary);
  text-underline-offset: 0.2em;
  text-decoration-thickness: 1px;
}
.game-cell-top a:hover {
  color: var(--color-primary-hover);
  text-decoration-color: var(--color-primary-hover);
}
.game-status {
  color: #6e7681;
  font-size: 0.75em;
  font-weight: 400;
}
.game-desc {
  margin: 0.2rem 0 0;
  font-size: 0.85em;
  color: #8b949e;
}
.pinned-find > summary {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  list-style: none;
}
.pinned-find > summary::-webkit-details-marker { display: none; }
.pinned-find > summary::marker { content: ""; }
.pinned-find > summary::before {
  content: "▸";
  flex-shrink: 0;
  width: 1em;
  color: var(--color-primary);
  font-size: 0.95em;
  line-height: 1;
}
.pinned-find[open] > summary::before { content: "▾"; }
.pinned-find-label {
  margin-right: auto;
  color: var(--color-primary);
  font-weight: 600;
}
.pinned-find > summary:hover .pinned-find-label {
  color: var(--color-primary-hover);
  text-decoration: underline;
}
.pinned-about-us {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  white-space: nowrap;
  font-weight: 600;
  padding-left: 12px;
  margin-left: 4px;
  border-left: 1px solid var(--color-border);
}
.pinned-links {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px 12px;
  width: 100%;
  margin-top: 8px;
  text-align: left;
}
.pinned-placeholder {
  color: var(--color-text-muted);
  font-size: 0.9em;
  padding: 8px;
}
</style>

<details class="pinned-find">
<summary><span class="pinned-find-label">Find Us</span><a class="pinned-about-us" href="100-about/" onclick="event.stopPropagation()">About</a></summary>
<div class="pinned-links">
  <p class="pinned-placeholder">Social links, email, and other profiles are left empty on purpose. Add them in <code>content/posts/000-pinned.md</code> and <code>content/posts/100-about.md</code> when you are ready.</p>
</div>
</details>
