import { css } from 'jimu-core'

export const styles = css`
  .ag-root {
    position: fixed;
    inset: 0;
    z-index: 2000;
    pointer-events: none;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    color: #12303a;
  }
  .ag-root * { box-sizing: border-box; }

  .ag-backdrop,
  .ag-header,
  .ag-thumb,
  .ag-bar,
  .ag-result,
  .ag-toast { pointer-events: auto; }

  .ag-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(8, 28, 36, 0.58);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .ag-card {
    background: #fff;
    border-radius: 22px;
    padding: 28px 26px;
    width: min(460px, 100%);
    max-height: 100%;
    overflow-y: auto;
    text-align: center;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
  }
  .ag-card h1 { margin: 6px 0 10px; font-size: 30px; line-height: 1.1; }
  .ag-card p { margin: 0 0 18px; font-size: 16px; line-height: 1.45; color: #36525c; }
  .ag-logo { font-size: 44px; }

  .ag-btn {
    appearance: none;
    border: 0;
    border-radius: 14px;
    min-height: 50px;
    padding: 0 22px;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.08s ease, opacity 0.15s ease;
  }
  .ag-btn:active:not(:disabled) { transform: scale(0.97); }
  .ag-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .ag-btn-primary { background: #0f6b5c; color: #fff; }
  .ag-btn-secondary { background: #e6f1ee; color: #0f4c5c; }
  .ag-btn-block { width: 100%; }

  .ag-header {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.96);
    border-radius: 999px;
    padding: 8px 18px;
    font-size: 15px;
    font-weight: 700;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
    white-space: nowrap;
  }

  .ag-photo-card {
    background: #fff;
    border-radius: 20px;
    padding: 10px;
    max-width: min(980px, 96vw);
    cursor: pointer;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
  }
  .ag-photo-card img {
    display: block;
    max-width: 100%;
    max-height: 70vh;
    border-radius: 12px;
    margin: 0 auto;
  }
  .ag-photo-hint {
    text-align: center;
    padding: 10px 6px 4px;
    font-weight: 700;
    font-size: 15px;
    color: #0f6b5c;
  }

  .ag-thumb {
    position: absolute;
    top: 64px;
    right: 12px;
    width: 220px;
    padding: 4px;
    border: 0;
    border-radius: 14px;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  }
  .ag-thumb img {
    display: block;
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
  }
  .ag-thumb span {
    display: block;
    padding: 4px 0 2px;
    font-size: 12px;
    font-weight: 700;
    color: #0f4c5c;
  }

  .ag-bar,
  .ag-result {
    position: absolute;
    left: 50%;
    bottom: 18px;
    transform: translateX(-50%);
    width: min(540px, calc(100% - 24px));
    background: #fff;
    border-radius: 18px;
    padding: 14px 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  }
  .ag-bar { display: flex; align-items: center; gap: 14px; }
  .ag-bar-hint { flex: 1; font-size: 14px; color: #36525c; line-height: 1.3; }
  .ag-bar-notice { color: #b42318; font-weight: 600; }

  .ag-result { text-align: center; }
  .ag-result-main { display: flex; align-items: baseline; justify-content: center; gap: 14px; margin-bottom: 6px; }
  .ag-dist { font-size: 34px; font-weight: 800; }
  .ag-pts { font-size: 20px; font-weight: 800; color: #0f6b5c; }
  .ag-place { font-size: 16px; margin-bottom: 4px; }
  .ag-anec { font-size: 14px; color: #36525c; line-height: 1.4; margin-bottom: 6px; }
  .ag-legend { font-size: 12px; color: #5b7680; margin: 4px 0 10px; }
  .ag-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin: 0 4px 0 10px; vertical-align: middle; }
  .ag-dot-guess { background: #2563eb; }
  .ag-dot-truth { background: #16a34a; }

  .ag-toast {
    position: absolute;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%);
    background: #fff;
    border-radius: 14px;
    padding: 12px 18px;
    font-weight: 600;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
    max-width: calc(100% - 24px);
    text-align: center;
  }
  .ag-toast-error { background: #fee4e2; color: #b42318; }

  .ag-score { font-size: 64px; font-weight: 800; color: #0f6b5c; line-height: 1; margin: 6px 0 14px; }
  .ag-score small { font-size: 20px; font-weight: 600; color: #5b7680; }
  .ag-recap { list-style: none; margin: 0 0 18px; padding: 0; text-align: left; }
  .ag-recap li {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 15px;
  }
  .ag-recap li:nth-of-type(odd) { background: #f1f7f5; }
  .ag-recap li span:last-of-type { font-weight: 700; color: #0f6b5c; }
  .ag-actions { display: flex; flex-direction: column; gap: 10px; }
  .ag-share-msg { margin: 12px 0 0 !important; font-size: 13px !important; }

  @media (max-width: 640px) {
    .ag-header { top: 8px; font-size: 14px; padding: 7px 14px; }
    .ag-thumb { top: 54px; right: 8px; width: 116px; }
    .ag-thumb img { height: 84px; }
    .ag-thumb span { font-size: 11px; }
    .ag-bar, .ag-result {
      bottom: 0;
      width: 100%;
      border-radius: 20px 20px 0 0;
      padding: 14px 16px calc(14px + env(safe-area-inset-bottom));
    }
    .ag-bar .ag-btn { min-width: 128px; }
    .ag-dist { font-size: 30px; }
    .ag-photo-card img { max-height: 62vh; }
    .ag-card { padding: 22px 18px; }
    .ag-score { font-size: 54px; }
  }
`
