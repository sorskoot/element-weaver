# Element Weaver

## Core Concept

Element Weaver is a cozy VR tile-matching game that combines domino placement with match-3 gameplay on a hexagonal board.

Players place domino-shaped pieces made from two colored hexagons. Creating groups of three or more connected tiles of the same color removes the entire group and awards points.

The goal is to survive as long as possible and achieve the highest score.

## Platform

- Primary platform: VR
- Also playable in a desktop browser
- Desktop controls: press Space to rotate the current domino preview 60° clockwise; mouse-wheel rotation remains available.
- Built with Wonderland Engine

## Core Design Pillars

1. Relaxing VR interaction.
2. Easy to learn, difficult to master.
3. Meaningful placement decisions.
4. Rewarding large matches.
5. Cozy presentation.

## Core Gameplay Loop

1. Preview the current domino.
2. Preview the next domino.
3. Rotate the domino.
4. Place it on the board.
5. Resolve all matches.
6. Score removed groups.
7. Receive the next domino.
8. Continue until no valid placements remain.

## Board

- Fixed-size hexagonal board.
- Radius 3.
- 37 playable cells before layout modifications.
- The board starts empty.

### Layouts

- Players select a layout from the menu before starting a game.
- Layouts disable specific cells on the board.
- Initial layouts are handcrafted.
- Layouts create different strategic challenges.
- Future versions may include a layout editor.
- The Cozy Grove layout is currently available; additional layouts still need to be enabled and selectable.

### End Condition

The game ends when no valid domino placement remains.

Examples:

- No adjacent empty cells remain.
- Only isolated single-cell openings remain.

## Dominoes

- Every piece consists of two connected hexagons.
- Dominoes may face any of the six hex-grid directions.
- Both hexes must fit on empty cells.
- Overlapping existing tiles is not allowed.

### Colors

- 15 nature-themed tile types.
- Tile types, rather than visual colors, determine matches.
- No wildcard color.
- Duplicate-type dominoes are allowed.
- 76% of generated dominoes contain two different tile types.
- 24% of generated dominoes contain two identical tile types.

## Matching Rules

- A match is a connected group of 3 or more tiles of the same type.
- Connections use hex-grid adjacency.
- The entire connected group is removed.
- All valid groups are removed simultaneously.
- Multiple groups may be removed by a single placement.
- Removed tiles become empty cells again.
- Empty holes inside the board are valid.
- No gravity.
- No refill mechanics.
- No cascades.

## Scoring

Scoring rewards efficient placements and large groups.

Factors:

- Number of tiles removed.
- Group size.
- Multiple groups removed in a single placement.
- Multiple colors matched in a single placement.

Exact score values should remain configurable.

## Balancing

The core game should remain simple.

If the game proves too easy during playtesting, difficulty should primarily be adjusted through:

- Board size.
- Board layouts.
- Number of colors.
- Domino color distribution.

The game should not rely on gravity, automatic board growth, refill mechanics, or cascading systems.

Potential future additions include special tiles, but these are not part of the core design.

Examples:

- Bomb tiles.
- Locked tiles.
- Color-clearing tiles.
- Blocker tiles.

These should only be explored after the core game has been thoroughly tested.

## Game Modes

### Endless

- Primary game mode.
- Continue until no valid placement remains.
- Highest score wins.

## Progression

### High Scores

- Record best scores.
- Track scores per layout.
- Support local leaderboards.

## User Interface

Visible during gameplay:

- Current score.
- Current domino.
- Next domino preview.

The score and multiplier HUD is shown during gameplay, replacing the main menu in the same world-space UI root. The current and next domino previews are handled separately.

Optional polish:

- Floating score popups.
- Match effects.
- Placement effects.
- Layout-specific presentation.

## Visual Direction

Initial direction:

- Cozy nature theme.

Possible future themes:

- Neon cyberpunk.
- Additional visual skins.

Gameplay should remain independent from the visual theme.

## Architecture

The project follows a lightweight MVVM-inspired architecture.

### Models

- GameState.
- BoardModel.
- DominoModel.
- LayoutModel.

### Services

- Domino generation.
- Placement validation.
- Match detection.
- Match resolution.
- Scoring.
- High score management.

### ViewModels

- Presentation state.
- Data exposed to views and UI.

### Wonderland Components

- Rendering.
- Input.
- Visual feedback.
- VR interaction.

Components should not contain core gameplay logic.

## Planned Implementation Order

1. Make all layouts selectable from the menu.
2. Complete the remaining gameplay HUD features.
3. Game-over detection.
4. High-score system.
5. Layout editor.
6. Visual polish.



