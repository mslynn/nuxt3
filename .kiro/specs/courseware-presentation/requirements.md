# Requirements Document

## Introduction

本功能为智启在线教室系统添加课件展示功能，类似于 PPT 演示。老师可以上传和展示课件，学生端实时同步查看。课件支持多页幻灯片，老师控制翻页，所有学生同步显示当前页面。

## Glossary

- **Courseware（课件）**: 由多个幻灯片组成的教学演示文稿
- **Slide（幻灯片）**: 课件中的单个页面，包含图片或内容
- **Presenter（演示者）**: 控制课件翻页的用户，通常是老师
- **Viewer（观看者）**: 观看课件的用户，通常是学生
- **Thumbnail（缩略图）**: 幻灯片的小尺寸预览图
- **Sync（同步）**: 通过 WebSocket 实现的实时状态同步

## Requirements

### Requirement 1

**User Story:** As a teacher, I want to upload courseware files, so that I can present teaching materials to students.

#### Acceptance Criteria

1. WHEN a teacher clicks the upload button THEN the Courseware System SHALL display a file selection dialog supporting image formats (PNG, JPG, JPEG, GIF, WebP)
2. WHEN a teacher selects multiple image files THEN the Courseware System SHALL create a courseware with each image as a separate slide
3. WHEN courseware is uploaded successfully THEN the Courseware System SHALL display the first slide in the main view area
4. WHEN courseware upload fails THEN the Courseware System SHALL display an error message indicating the failure reason

### Requirement 2

**User Story:** As a teacher, I want to navigate through slides, so that I can control the presentation flow.

#### Acceptance Criteria

1. WHEN a teacher clicks the next button THEN the Courseware System SHALL advance to the next slide and broadcast the change to all viewers
2. WHEN a teacher clicks the previous button THEN the Courseware System SHALL go back to the previous slide and broadcast the change to all viewers
3. WHEN a teacher clicks a thumbnail in the slide list THEN the Courseware System SHALL jump to that specific slide and broadcast the change
4. WHEN the current slide is the first slide THEN the Courseware System SHALL disable the previous button
5. WHEN the current slide is the last slide THEN the Courseware System SHALL disable the next button
6. WHEN a teacher uses keyboard arrow keys THEN the Courseware System SHALL navigate slides accordingly (Left/Up for previous, Right/Down for next)

### Requirement 3

**User Story:** As a student, I want to view the teacher's courseware in real-time, so that I can follow the lesson content.

#### Acceptance Criteria

1. WHEN a teacher starts presenting courseware THEN the Courseware System SHALL display the courseware view to all students in the room
2. WHEN a teacher changes the current slide THEN the Courseware System SHALL update all student views to show the same slide within 500ms
3. WHEN a student joins a room with active courseware THEN the Courseware System SHALL display the current slide being presented
4. WHEN a teacher stops presenting courseware THEN the Courseware System SHALL notify students and return to the default view

### Requirement 4

**User Story:** As a teacher, I want to see a thumbnail list of all slides, so that I can quickly navigate to any slide.

#### Acceptance Criteria

1. WHEN courseware is loaded THEN the Courseware System SHALL display a vertical thumbnail list on the left side showing all slides
2. WHEN a slide is currently active THEN the Courseware System SHALL highlight that thumbnail with a visible border or background
3. WHEN the thumbnail list exceeds the visible area THEN the Courseware System SHALL enable scrolling within the thumbnail panel
4. WHEN a teacher hovers over a thumbnail THEN the Courseware System SHALL display a subtle hover effect

### Requirement 5

**User Story:** As a user, I want to see the current slide position, so that I know my progress through the courseware.

#### Acceptance Criteria

1. WHEN courseware is being presented THEN the Courseware System SHALL display the current slide number and total slide count (e.g., "幻灯片 3/17")
2. WHEN the slide changes THEN the Courseware System SHALL update the slide counter immediately

### Requirement 6

**User Story:** As a teacher, I want to use fullscreen mode for presentations, so that students can focus on the content.

#### Acceptance Criteria

1. WHEN a teacher clicks the fullscreen button THEN the Courseware System SHALL expand the slide view to fullscreen mode
2. WHEN in fullscreen mode and the teacher presses Escape or clicks exit THEN the Courseware System SHALL return to normal view
3. WHILE in fullscreen mode THEN the Courseware System SHALL maintain slide navigation functionality

### Requirement 7

**User Story:** As a teacher, I want to zoom in/out on slides, so that I can highlight specific content areas.

#### Acceptance Criteria

1. WHEN a teacher clicks the zoom in button THEN the Courseware System SHALL increase the slide display size
2. WHEN a teacher clicks the zoom out button THEN the Courseware System SHALL decrease the slide display size
3. WHEN a teacher clicks the fit button THEN the Courseware System SHALL reset the slide to fit the view area

### Requirement 8

**User Story:** As a teacher, I want to switch between courseware view and other views (whiteboard, screen share), so that I can use different teaching tools.

#### Acceptance Criteria

1. WHEN a teacher switches to courseware view THEN the Courseware System SHALL display the courseware panel in the main content area
2. WHEN a teacher switches away from courseware view THEN the Courseware System SHALL preserve the current slide position
3. WHEN a teacher returns to courseware view THEN the Courseware System SHALL restore the previously viewed slide
