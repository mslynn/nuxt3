# Implementation Plan

- [ ] 1. Set up testing infrastructure
  - [ ] 1.1 Install Vitest and fast-check dependencies
    - Add vitest, @vue/test-utils, jsdom, fast-check to devDependencies
    - Create vitest.config.ts with jsdom environment
    - _Requirements: Testing Strategy_
  - [ ] 1.2 Create test utilities and helpers
    - Create test/utils/courseware-generators.ts for generating test courseware data
    - Create mock Reveal.js instance for unit tests
    - _Requirements: Testing Strategy_

- [x] 2. Implement useRevealPlayer composable


  - [x] 2.1 Create useRevealPlayer.ts with core functionality


    - Initialize Reveal.js with vertical navigation configuration
    - Implement goToSlide, nextSlide, prevSlide methods
    - Track currentSlide and totalSlides state
    - Handle keyboard and scroll navigation
    - _Requirements: 2.1, 2.2, 2.3, 6.1, 6.2, 6.3, 6.4_
  - [ ]* 2.2 Write property test for navigation consistency
    - **Property 3: Navigation Consistency**
    - **Validates: Requirements 2.1, 2.2, 2.3**
  - [ ]* 2.3 Write unit tests for useRevealPlayer
    - Test initialization with vertical config
    - Test boundary conditions (first/last slide)
    - _Requirements: 2.4, 2.5_

- [x] 3. Implement ThumbnailList component


  - [x] 3.1 Create ThumbnailList.vue component


    - Render vertical scrollable thumbnail list
    - Display slide number and preview for each slide
    - Highlight active thumbnail with orange border
    - Auto-scroll to keep active thumbnail visible
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [ ]* 3.2 Write property test for thumbnail highlighting
    - **Property 5: Active Thumbnail Highlighting**
    - **Validates: Requirements 3.3**
  - [ ]* 3.3 Write property test for thumbnail click navigation
    - **Property 4: Thumbnail Click Navigation**
    - **Validates: Requirements 3.2**

- [x] 4. Implement SlideCounter component


  - [x] 4.1 Create SlideCounter.vue component


    - Display current slide number and total in format "幻灯片 X/Y"
    - Update immediately on slide change
    - _Requirements: 4.1, 4.2_
  - [ ]* 4.2 Write property test for slide counter format
    - **Property 6: Slide Counter Format**
    - **Validates: Requirements 4.1, 4.2**

- [x] 5. Implement VerticalRevealPlayer main component


  - [x] 5.1 Create VerticalRevealPlayer.vue component


    - Integrate ThumbnailList, SlideCounter, and Reveal.js container
    - Layout: left sidebar (thumbnails) + main area (slides)
    - Wire up navigation between components
    - _Requirements: 1.1, 1.2, 1.3_
  - [x] 5.2 Add control toolbar with fullscreen and zoom

    - Implement fullscreen toggle button
    - Implement zoom in/out/fit controls
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [ ]* 5.3 Write property test for slide count consistency
    - **Property 1: Slide Count Consistency**
    - **Validates: Requirements 1.1, 1.3**
  - [ ]* 5.4 Write property test for initial slide position
    - **Property 2: Initial Slide Position**
    - **Validates: Requirements 1.2**

- [ ] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement sync functionality
  - [ ] 7.1 Create useSlideSync composable
    - Emit slide change events for presenter
    - Handle incoming sync events for viewers
    - Integrate with existing WebSocket infrastructure
    - _Requirements: 7.1, 7.2, 7.3_
  - [ ]* 7.2 Write property test for sync event emission
    - **Property 7: Sync Event Emission**
    - **Validates: Requirements 7.1**
  - [ ]* 7.3 Write property test for sync event handling
    - **Property 8: Sync Event Handling**
    - **Validates: Requirements 7.2**

- [ ] 8. Implement error handling
  - [ ] 8.1 Add error states and error display
    - Handle courseware load errors
    - Handle render errors with fallback
    - Display user-friendly error messages
    - _Requirements: 1.4_
  - [ ]* 8.2 Write unit tests for error handling
    - Test error state transitions
    - Test error message display
    - _Requirements: 1.4_

- [x] 9. Integration and demo page



  - [x] 9.1 Update reveal-demo.vue to use VerticalRevealPlayer


    - Replace existing RevealPlayer with VerticalRevealPlayer
    - Add sample courseware data for testing
    - _Requirements: All_
  - [x] 9.2 Integrate with classroom page

    - Add VerticalRevealPlayer to classroom view options
    - Wire up sync mode for teacher/student roles
    - _Requirements: 7.1, 7.2, 7.3_

- [ ] 10. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
