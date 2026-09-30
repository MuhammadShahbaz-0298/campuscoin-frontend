import { TrendingUp } from "lucide-react";

/**
 * Hero illustration for the auth brand panel.
 * Layered line-art: ambient blobs, a ghost card, a balance card with
 * animated bars, a drawn-in savings line and floating coins.
 * Theme-dependent colors come from CSS custom properties.
 */
export default function AuthHeroArt() {
  return (
    <div className="auth-art">
      <svg
        className="auth-art__svg"
        viewBox="0 0 560 380"
        role="img"
        aria-label="Campus Coin balance card showing a semester balance of $1,284.50, up $42 this week, with a rising savings chart."
      >
        <defs>
          <linearGradient id="ccLineStroke" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3a6" />
            <stop offset="55%" stopColor="#4ae4bd" />
            <stop offset="100%" stopColor="#58a6ff" />
          </linearGradient>
          <linearGradient id="ccAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3a6" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#22d3a6" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle className="art-blob art-blob--a" cx="152" cy="116" r="104" />
        <circle className="art-blob art-blob--b" cx="436" cy="266" r="92" />

        <rect
          className="art-ghost-card"
          x="86"
          y="58"
          width="248"
          height="152"
          rx="20"
          transform="rotate(-7 210 134)"
        />

        <path
          className="art-area"
          d="M64 334 C130 330 168 336 226 312 C288 286 322 300 372 276 C424 250 452 258 506 232 L506 356 L64 356 Z"
        />
        <path
          className="art-line"
          pathLength="1"
          d="M64 334 C130 330 168 336 226 312 C288 286 322 300 372 276 C424 250 452 258 506 232"
        />
        <circle className="art-dot-halo" cx="506" cy="232" r="8" />
        <circle className="art-dot" cx="506" cy="232" r="7" />

        <rect
          className="art-card"
          x="150"
          y="52"
          width="320"
          height="180"
          rx="22"
        />
        <text className="art-card-label" x="176" y="94">
          Semester balance
        </text>
        <text className="art-card-amount" x="176" y="140">
          $1,284.50
        </text>
        <rect className="art-pill" x="176" y="158" width="136" height="30" rx="15" />
        <text className="art-pill-text" x="196" y="178">
          +$42 this week
        </text>

        <rect className="art-bar" style={{ "--i": 0 }} x="366" y="166" width="16" height="30" rx="5" />
        <rect className="art-bar" style={{ "--i": 1 }} x="388" y="148" width="16" height="48" rx="5" />
        <rect className="art-bar" style={{ "--i": 2 }} x="410" y="156" width="16" height="40" rx="5" />
        <rect className="art-bar art-bar--hi" style={{ "--i": 3 }} x="432" y="134" width="16" height="62" rx="5" />

        <g className="art-float">
          <circle className="art-coin" cx="94" cy="200" r="30" />
          <text className="art-coin-text" x="94" y="200">
            $
          </text>
        </g>
        <g className="art-float art-float--b">
          <circle className="art-coin" cx="512" cy="94" r="22" />
          <text className="art-coin-text" x="512" y="94" style={{ fontSize: "14px" }}>
            $
          </text>
        </g>
        <g className="art-float art-float--c">
          <circle className="art-coin" cx="470" cy="318" r="26" />
          <text className="art-coin-text" x="470" y="318" style={{ fontSize: "15px" }}>
            $
          </text>
        </g>

        <circle className="art-spark" cx="128" cy="308" r="4" />
        <circle className="art-spark art-spark--b" cx="340" cy="46" r="5" />
        <circle className="art-spark art-spark--c" cx="240" cy="272" r="3.5" />
      </svg>

      <div className="auth-stat">
        <span className="auth-stat__icon" aria-hidden="true">
          <TrendingUp size={16} strokeWidth={2.4} />
        </span>
        <div>
          <strong>$340 / semester</strong>
          <span>Average student savings with Campus Coin</span>
        </div>
      </div>
    </div>
  );
}
