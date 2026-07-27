# Element Weaver Migration Plan

## Goal

Move from the current elemental edge-matching prototype to the GDD-defined domino color-matching game while preserving the existing service-oriented architecture and minimizing rework.

## Current State Summary

Current implementation:

- Fixed hex-grid data structure already exists.
- Service-driven gameplay architecture exists.
- Placement flow exists.
- Preview system exists.
- Scoring system exists.
- UI integration exists.

Current gameplay differs from the GDD:

- Single hex tiles instead of dominoes.
- Element edge matching instead of color groups.
- Infinite placeholder expansion instead of a fixed board.
- No tile removal.
- No layouts.
- No game-over detection.

## Guiding Principle

Keep the architecture.

Replace gameplay rules inside the existing domain layer instead of rewriting rendering, UI, or interaction systems.

The current services are already close to the desired separation of concerns described in the GDD.

## Phase 1 - Introduce New Domain Models

Estimated impact: Low

Create:

- BoardModel
- DominoModel
- LayoutModel
- GameState

Keep GameModel temporarily as a compatibility wrapper.

BoardModel should become the source of truth for:

- Fixed board cells
- Occupied cells
- Disabled cells
- Neighbor lookup

Result:

- New GDD domain exists without breaking the current game.

## Phase 2 - Replace Infinite Board With Fixed Layout Board

Estimated impact: Low

Remove:

- Placeholder expansion gameplay

Add:

- Radius 4 board generation
- Cell enable/disable support
- Layout loading

Keep rendering components.

Only change the board data source.

Result:

- Board behaves like the GDD.

## Phase 3 - Add Domino Placement

Estimated impact: Medium

Create:

- DominoGenerationService
- PlacementValidationService

Domino model:

- Color A
- Color B
- Orientation

Placement validation:

- Both cells must exist
- Both cells must be enabled
- Both cells must be empty

Reuse:

- Existing preview flow
- Existing rotation controls
- Existing placement interaction

Result:

- Core placement loop matches the GDD.

## Phase 4 - Replace Match Logic

Estimated impact: Medium

Remove:

- ElementDistributionService dependency from gameplay
- Edge matching logic

Create:

- MatchDetectionService

Responsibilities:

- Flood-fill connected groups
- Find groups of 3+
- Return all matching groups

Result:

- GDD matching rules implemented.

## Phase 5 - Add Match Resolution

Estimated impact: Low

Create:

- MatchResolutionService

Responsibilities:

- Remove all valid groups simultaneously
- Return removed tiles
- Leave holes in the board

No gravity.

No cascades.

No refill.

Exactly as specified in the GDD.

Result:

- Complete match cycle exists.

## Phase 6 - Replace Scoring

Estimated impact: Low

Refactor ScoreService.

Inputs:

- Total removed tiles
- Group sizes
- Number of groups
- Number of colors matched

Keep score presentation unchanged.

Result:

- Scoring aligns with GDD while preserving UI.

## Phase 7 - Add Current And Next Domino Queue

Estimated impact: Low

Replace current tile preview generation.

Maintain:

- Current domino
- Next domino

Reuse existing preview infrastructure.

Result:

- Full placement loop from GDD.

## Phase 8 - Add Game Over Detection

Estimated impact: Low

Create:

- GameOverService

Check:

- Every empty cell
- Every domino orientation

If no valid placement exists:

- End game

Result:

- Endless mode complete.

## Phase 9 - Layout Selection

Estimated impact: Low

Add:

- Layout definitions
- Layout selection screen

Start with:

- Classic radius-4 board
- One or two handcrafted variants

Result:

- Meaningful replayability.

## Phase 10 - High Scores

Estimated impact: Low

Create:

- HighScoreService

Track:

- Overall score
- Score per layout

Result:

- Core progression complete.

## Recommended Execution Order

1. New domain models
2. Fixed board
3. Domino placement
4. Match detection
5. Match resolution
6. Scoring update
7. Current/next domino queue
8. Game-over detection
9. Layout selection
10. High scores

## Fastest Path

The fastest route is not a rewrite.

Keep:

- UI
- Input
- Rendering components
- Service registration and wiring
- Game flow architecture

Replace only:

- Tile data model
- Placement rules
- Match logic
- Board generation

This preserves most of the existing code while moving the gameplay fully toward the GDD.