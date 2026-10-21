# X link preview V2

final result: passed

## Comparison evidence

- Sources: `C:/Users/Sonde/AppData/Local/Temp/codex-clipboard-403ab6c3-486f-4e5a-a52d-019170982eb1.png` (1218 × 710, compact); `codex-clipboard-c57b4fb9-f43b-495a-b3d0-9254995bec74.png` (1202 × 938, Echo); `codex-clipboard-0acb2fc5-497e-4668-a031-a749fdda8d05.png` (1198 × 848, AI Scout); `codex-clipboard-6853a307-531e-45ac-9e2b-ddc9eba6d6ba.png` (1198 × 958, π). All four source files are in the same Temp directory.
- Combined source/rendered comparison: `C:/Users/Sonde/.codex/visualizations/2026/10/08/01a11aa0-2c5f-7ce3-8433-8a45be8aef87/x-card-visual-comparison.png`.
- Component comparison viewport: 1280 × 720, rendered card width 518 CSS px, screenshot density 1×. Source card crops approximately 1036 px wide were normalized to 518 px (2× source density). Each focused comparison includes the entire card, title, border and source; unrelated X account/actions are excluded.
- Public/editor mobile evidence in the same output directory: `x-public-mobile.png`, `x-editor-mobile.png`. Checked 390 × 844 and 320 × 720 without horizontal overflow.

## Findings and resolution

- Initial P2: title badge was 30 px high against approximately 20 px in the normalized reference. Reduced vertical padding/line height; the revised badge measures 20 px and retains a 12 px inset and one-line ellipsis.
- Initial P2: compact text inset was wider than the reference. Reduced it to 12 px and aligned the 25% media column; desktop height is 130 px and mobile minimum height 132 px.
- A temporary preview-server SVG MIME issue was corrected before comparison; the bundled document icon loads normally. The final comparison uses loaded cover images, not loading placeholders.
- Second comparison: large cards measure 1.9100:1, have an 18 px radius and #CFD9DE border, no white title panel or description; compact cards show domain/title/description internally and no outside From. No actionable P0/P1/P2 findings remain.
- Intentional differences: live page metadata can differ from the historical screenshots; π retains the actual original hostname `www.pi.website`. The compact document icon is the standard Material Icons outlined article asset.

## Core verification

- Four requested URLs checked: Echo and π supplied real large-card metadata; Aaron Gray supplied title/description without a cover; AI Scout rejected the metadata fetch and remains a normal URL. No substitute cover was invented.
- Verified original URLs remain editable, default preview URL deduplication, explicit “正文保留网址”, removal/restoration, simulated repository save and reopen, and matching Hugo/public rendering. Images that fail load switch to compact cards.
- Six targeted tests passed; Hugo 0.111.3 full build passed. Existing thought files, site typography, authentication configuration and Netlify build command were unchanged.
- Final public-preview browser console: no errors.
- Production deployment was not performed. The local test backend is a simulation of repository publishing.
