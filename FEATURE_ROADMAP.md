# OMeD Feature Roadmap & Development Plan

## 📋 Overview
This document outlines proposed features and enhancements for OMeD (Open Medical Datasets) platform, organized by priority, category, and implementation complexity.

---

## 🔥 High Priority Features

### Search & Discovery

#### 1. **Advanced Search Filters** ⭐ HIGH PRIORITY
- **Description**: Add multiple filter options (date range, download count, specialties, tags)
- **Why**: Current search is basic - users need better dataset discovery
- **Implementation**:
  - Add filter sidebar/dropdown on datasets page
  - Filter by: date range, upvotes, downloads, multiple specialties, tags
  - Combine filters (AND/OR logic)
- **Complexity**: Medium
- **Dependencies**: Update `getDatasets` function in `app/datasets/page.tsx`
- **Database Changes**: None required (use existing fields)
- **UI Components**: Create `FiltersPanel.tsx` component

#### 2. **Search Autocomplete & Suggestions**
- **Description**: Real-time search suggestions as user types
- **Why**: Improves UX and helps users find relevant datasets faster
- **Implementation**:
  - Debounced search API endpoint
  - Suggest dataset titles, specialties, popular tags
  - Click-to-search functionality
- **Complexity**: Medium
- **Dependencies**: New API route `/api/search/suggestions`
- **Database Changes**: Consider adding search index on title/abstract
- **UI Components**: Extend `SearchBar.tsx` with suggestions dropdown

#### 3. **Sort Options** ⭐ HIGH PRIORITY
- **Description**: Sort datasets by relevance, date, upvotes, downloads
- **Why**: Essential for users to find what they need
- **Implementation**:
  - Add sort dropdown to datasets page
  - Options: Newest, Most Upvoted, Most Downloaded, Most Relevant
- **Complexity**: Low
- **Dependencies**: Update `getDatasets` function
- **Database Changes**: None

#### 4. **Tag Cloud & Popular Tags**
- **Description**: Display popular tags and allow filtering by tags
- **Why**: Helps discover datasets through tag associations
- **Implementation**:
  - Extract most common tags from datasets
  - Display as clickable cloud
  - Filter datasets by selected tags
- **Complexity**: Low-Medium
- **Dependencies**: Create `TagsCloud.tsx` component
- **Database Changes**: None (tags already stored as array)

### Dataset Management

#### 5. **Dataset Edit/Update Functionality** ⭐ HIGH PRIORITY
- **Description**: Allow dataset submitters to edit their submissions
- **Why**: Users need to update dataset information, fix errors
- **Implementation**:
  - Add "Edit" button on dataset detail page (for submitter only)
  - Pre-fill form with existing data
  - Change status back to "pending" after edit (or admin approval)
- **Complexity**: Medium
- **Dependencies**: Update `SubmissionForm.tsx` to handle edit mode
- **Database Changes**: None (use existing UPDATE policies)
- **UI Components**: `EditDatasetButton.tsx`, modify `SubmissionForm.tsx`

#### 6. **Dataset Versioning & History**
- **Description**: Track changes to datasets over time
- **Why**: Important for research reproducibility and transparency
- **Implementation**:
  - Create `dataset_versions` table
  - Store previous versions when dataset is updated
  - Display version history on dataset page
- **Complexity**: High
- **Dependencies**: Database schema changes
- **Database Changes**: 
  ```sql
  CREATE TABLE dataset_versions (
    id UUID PRIMARY KEY,
    dataset_id UUID REFERENCES datasets(id),
    title TEXT,
    abstract TEXT,
    -- ... other fields
    version_number INTEGER,
    created_at TIMESTAMP
  );
  ```

#### 7. **Batch Dataset Import**
- **Description**: Allow admins to import multiple datasets via CSV/JSON
- **Why**: Useful for bulk importing datasets from external sources
- **Implementation**:
  - CSV/JSON upload interface in admin panel
  - Validation and preview before import
  - Error handling and reporting
- **Complexity**: Medium-High
- **Dependencies**: Create `BatchImport.tsx` component
- **Database Changes**: None

### Community Features

#### 8. **User Following System**
- **Description**: Allow users to follow other researchers and get notified of their submissions
- **Why**: Builds community and helps users discover relevant datasets
- **Implementation**:
  - Create `follows` table (follower_id, following_id)
  - Add "Follow" button on user profiles
  - Display followed users' datasets on dashboard
- **Complexity**: Medium
- **Dependencies**: 
  - Database schema: `follows` table
  - Notifications system (see #15)
- **Database Changes**:
  ```sql
  CREATE TABLE follows (
    id UUID PRIMARY KEY,
    follower_id UUID REFERENCES auth.users(id),
    following_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP,
    UNIQUE(follower_id, following_id)
  );
  ```

#### 9. **Dataset Collections/Lists**
- **Description**: Users can create custom collections/lists of datasets
- **Why**: Helps researchers organize datasets for specific projects
- **Implementation**:
  - Create `collections` and `collection_datasets` tables
  - UI to create/view/edit collections
  - Share collections via URL
- **Complexity**: Medium
- **Dependencies**: Database schema changes
- **Database Changes**:
  ```sql
  CREATE TABLE collections (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    name TEXT,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP
  );
  CREATE TABLE collection_datasets (
    collection_id UUID REFERENCES collections(id),
    dataset_id UUID REFERENCES datasets(id),
    added_at TIMESTAMP,
    PRIMARY KEY (collection_id, dataset_id)
  );
  ```

#### 10. **Rating & Reviews System**
- **Description**: Allow users to rate datasets (1-5 stars) and write detailed reviews
- **Why**: Helps other users assess dataset quality
- **Implementation**:
  - Create `ratings` and `reviews` tables
  - Display average rating on dataset cards
  - Review moderation (admins can flag inappropriate reviews)
- **Complexity**: Medium
- **Dependencies**: Database schema, moderation system
- **Database Changes**:
  ```sql
  CREATE TABLE ratings (
    id UUID PRIMARY KEY,
    dataset_id UUID REFERENCES datasets(id),
    user_id UUID REFERENCES auth.users(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP,
    UNIQUE(dataset_id, user_id)
  );
  CREATE TABLE reviews (
    id UUID PRIMARY KEY,
    dataset_id UUID REFERENCES datasets(id),
    user_id UUID REFERENCES auth.users(id),
    content TEXT,
    is_verified BOOLEAN DEFAULT false,
    flagged BOOLEAN DEFAULT false,
    created_at TIMESTAMP
  );
  ```

### Analytics & Insights

#### 11. **Dataset Analytics Dashboard**
- **Description**: Show dataset statistics (views, downloads, upvotes over time)
- **Why**: Help submitters understand dataset popularity and impact
- **Implementation**:
  - Create `dataset_views` table to track views
  - Charts using recharts or similar
  - Display on dataset detail page (for submitter/admin)
- **Complexity**: Medium
- **Dependencies**: Database schema, charting library
- **Database Changes**:
  ```sql
  CREATE TABLE dataset_views (
    id UUID PRIMARY KEY,
    dataset_id UUID REFERENCES datasets(id),
    user_id UUID REFERENCES auth.users(id) NULL,
    ip_address TEXT,
    viewed_at TIMESTAMP
  );
  ```

#### 12. **Platform Statistics Page**
- **Description**: Public page showing platform stats (total datasets, users, downloads, etc.)
- **Why**: Showcase platform growth and impact
- **Implementation**:
  - Aggregate statistics from existing tables
  - Real-time or cached (update every hour)
  - Beautiful charts and visualizations
- **Complexity**: Low-Medium
- **Dependencies**: Create `/app/statistics/page.tsx`

---

## 🟡 Medium Priority Features

### Search & Discovery

#### 13. **Saved Searches**
- **Description**: Users can save their search queries and get notified of new matches
- **Why**: Useful for researchers tracking specific topics
- **Implementation**:
  - Store saved searches in database
  - Daily/weekly email notifications (requires notification system)
- **Complexity**: Medium
- **Dependencies**: Notifications system, email service

#### 14. **Dataset Recommendations**
- **Description**: "You may also like" suggestions based on viewing history
- **Why**: Improves dataset discovery
- **Implementation**:
  - Track user interactions (views, downloads, upvotes)
  - Simple collaborative filtering algorithm
  - Display recommendations on homepage for logged-in users
- **Complexity**: Medium-High
- **Dependencies**: Analytics tracking (#11)

### Community Features

#### 15. **Notification System** ⭐ MEDIUM PRIORITY
- **Description**: In-app notifications for comments, upvotes, approvals, etc.
- **Why**: Essential for active community engagement
- **Implementation**:
  - Create `notifications` table
  - Real-time updates using Supabase Realtime
  - Notification bell icon in navbar
  - Mark as read/unread
- **Complexity**: High
- **Dependencies**: 
  - Database schema
  - Supabase Realtime configuration
  - Email integration for email notifications
- **Database Changes**:
  ```sql
  CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    type TEXT, -- 'comment', 'upvote', 'approval', 'follow', etc.
    reference_id UUID, -- ID of related item
    message TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP
  );
  ```

#### 16. **Comments Threading (Nested Replies)**
- **Description**: Allow replies to comments (threaded discussions)
- **Why**: Better discussion organization
- **Implementation**:
  - Add `parent_comment_id` to comments table
  - Recursive comment display
  - UI for reply functionality
- **Complexity**: Medium
- **Dependencies**: Database schema update
- **Database Changes**: Add `parent_comment_id UUID REFERENCES comments(id)` to comments table

#### 17. **User Badges & Achievements**
- **Description**: Reward active users with badges
- **Why**: Gamification increases engagement
- **Implementation**:
  - Badge types: "First Submission", "10 Upvotes", "Verified Researcher", etc.
  - Display badges on profiles
  - Badge collection page
- **Complexity**: Low-Medium
- **Dependencies**: 
  - Create `user_badges` table
  - Badge assignment logic (triggers or scheduled jobs)

### Dataset Management

#### 18. **Dataset Duplicate Detection**
- **Description**: Warn admins if duplicate dataset is being submitted
- **Why**: Prevents duplicate entries
- **Implementation**:
  - Compare title/abstract similarity using fuzzy matching
  - Check DOI uniqueness
  - Warning in admin panel
- **Complexity**: Medium
- **Dependencies**: Fuzzy string matching library (e.g., `fuse.js`)

#### 19. **Dataset Export Functionality**
- **Description**: Export dataset metadata to CSV, JSON, BibTeX formats
- **Why**: Useful for researchers citing datasets
- **Implementation**:
  - Export single dataset or search results
  - Format converters (CSV, JSON, BibTeX, RIS)
  - Download button on datasets page
- **Complexity**: Low-Medium
- **Dependencies**: Format conversion libraries

#### 20. **DOI Integration & Auto-validation**
- **Description**: Auto-fetch dataset information from DOI
- **Why**: Reduces manual data entry and improves accuracy
- **Implementation**:
  - Integrate with CrossRef or DataCite API
  - Auto-populate fields when DOI is entered
  - Validate DOI format and existence
- **Complexity**: Medium
- **Dependencies**: External API integration (CrossRef/DataCite)

### UX/UI Enhancements

#### 21. **Advanced Dataset Card Display**
- **Description**: Rich dataset preview with images, key metrics
- **Why**: Better visual representation helps users decide
- **Implementation**:
  - Expandable cards with more details
  - Image carousel for datasets with multiple images
  - Quick preview without navigating to detail page
- **Complexity**: Low-Medium
- **Dependencies**: Update `DatasetCard.tsx`

#### 22. **Responsive Image Optimization**
- **Description**: Better image handling with lazy loading, WebP format
- **Why**: Improves page load times and user experience
- **Implementation**:
  - Use Next.js Image component everywhere
  - Lazy load images below fold
  - Convert to WebP format automatically
- **Complexity**: Low
- **Dependencies**: Next.js Image (already in use)

#### 23. **Keyboard Shortcuts**
- **Description**: Power users can navigate with keyboard
- **Why**: Improves efficiency for frequent users
- **Implementation**:
  - `Ctrl/Cmd + K` for search
  - `Ctrl/Cmd + /` for shortcuts help
  - Arrow keys for navigation
- **Complexity**: Low-Medium
- **Dependencies**: Keyboard event handlers

---

## 🟢 Low Priority Features (Nice to Have)

### Search & Discovery

#### 24. **Advanced Search with Boolean Operators**
- **Description**: Support AND, OR, NOT in search queries
- **Why**: Power users want advanced search
- **Complexity**: Medium-High

#### 25. **Map View of Datasets**
- **Description**: Show datasets on world map (if location data available)
- **Why**: Visual discovery by geographic region
- **Complexity**: Medium
- **Dependencies**: Add location data to datasets

### Community Features

#### 26. **Research Groups/Teams**
- **Description**: Users can form research groups and share datasets
- **Why**: Collaboration features
- **Complexity**: High

#### 27. **Dataset Challenges/Contests**
- **Description**: Periodically run challenges for specific research areas
- **Why**: Gamification and community building
- **Complexity**: High

### Analytics

#### 28. **Public API for Datasets**
- **Description**: REST/GraphQL API for programmatic access
- **Why**: Enables integrations and automation
- **Complexity**: Medium-High
- **Dependencies**: API documentation, rate limiting

#### 29. **Dataset Citation Counter**
- **Description**: Track how often datasets are cited in papers
- **Why**: Measures real-world impact
- **Complexity**: High
- **Dependencies**: Integrate with citation databases (CrossRef, Google Scholar)

### Technical Enhancements

#### 30. **Multi-language Support (i18n)**
- **Description**: Translate platform to multiple languages
- **Why**: Global accessibility
- **Complexity**: High
- **Dependencies**: i18n library (next-intl, react-i18next)

#### 31. **Advanced Caching & Performance**
- **Description**: Implement Redis caching, CDN optimization
- **Why**: Better scalability and speed
- **Complexity**: Medium-High

#### 32. **Progressive Web App (PWA)**
- **Description**: Make app installable on mobile devices
- **Why**: Better mobile experience
- **Complexity**: Low-Medium
- **Dependencies**: Service worker, manifest.json

---

## 🔧 Technical Infrastructure Improvements

### 33. **Error Tracking & Monitoring**
- **Description**: Integrate Sentry or similar for error tracking
- **Why**: Proactive bug detection
- **Complexity**: Low
- **Dependencies**: Error tracking service

### 34. **Automated Testing**
- **Description**: Add unit tests, integration tests, E2E tests
- **Why**: Code quality and regression prevention
- **Complexity**: Medium-High
- **Dependencies**: Testing framework (Jest, Playwright)

### 35. **Database Migration System**
- **Description**: Version-controlled database migrations
- **Why**: Easier deployment and rollback
- **Complexity**: Medium
- **Dependencies**: Migration tool (supabase migration tool)

### 36. **CI/CD Pipeline**
- **Description**: Automated testing and deployment
- **Why**: Faster and safer releases
- **Complexity**: Medium
- **Dependencies**: GitHub Actions, Vercel

### 37. **API Rate Limiting**
- **Description**: Prevent abuse with rate limiting
- **Why**: Security and resource protection
- **Complexity**: Medium
- **Dependencies**: Rate limiting middleware or service

### 38. **Comprehensive Logging**
- **Description**: Structured logging for debugging and analytics
- **Why**: Better observability
- **Complexity**: Medium
- **Dependencies**: Logging service (LogRocket, Datadog)

---

## 📱 Mobile App (Future Consideration)

### 39. **React Native Mobile App**
- **Description**: Native iOS/Android app
- **Why**: Better mobile experience
- **Complexity**: Very High
- **Dependencies**: React Native, mobile app stores

---

## 🎯 Recommended Implementation Order

### Phase 1 (Immediate - Next 2-4 weeks)
1. **Sort Options** (#3) - Quick win
2. **Advanced Search Filters** (#1) - High user value
3. **Tag Cloud** (#4) - Enhances discovery
4. **Dataset Edit Functionality** (#5) - Essential feature

### Phase 2 (Short-term - Next 2-3 months)
5. **Notification System** (#15) - Foundation for engagement
6. **Dataset Analytics Dashboard** (#11) - User value
7. **Search Autocomplete** (#2) - UX improvement
8. **User Following System** (#8) - Community building

### Phase 3 (Medium-term - 3-6 months)
9. **Dataset Collections** (#9) - Advanced feature
10. **Rating & Reviews** (#10) - Quality assessment
11. **Saved Searches** (#13) - Power user feature
12. **Comments Threading** (#16) - Community enhancement

### Phase 4 (Long-term - 6+ months)
13. **Dataset Versioning** (#6) - Advanced management
14. **Recommendations System** (#14) - ML/AI feature
15. **Public API** (#28) - Developer ecosystem
16. **Multi-language Support** (#30) - Global expansion

---

## 📊 Feature Complexity Matrix

| Feature | Complexity | Estimated Time | Priority |
|---------|-----------|----------------|----------|
| Sort Options | Low | 4-6 hours | High |
| Advanced Filters | Medium | 1-2 days | High |
| Dataset Edit | Medium | 2-3 days | High |
| Notification System | High | 1-2 weeks | Medium |
| Collections | Medium | 1 week | Medium |
| Versioning | High | 2 weeks | Medium |
| Recommendations | High | 2-3 weeks | Medium |

---

## 🤝 Contributing
This roadmap is a living document. Features may be added, modified, or reprioritized based on:
- User feedback
- Technical constraints
- Resource availability
- Strategic priorities

---

## 📝 Notes
- **Database Changes**: Always test migrations in staging first
- **UI Components**: Reuse existing shadcn/ui components when possible
- **Security**: All new features must respect RLS policies
- **Performance**: Monitor query performance, add indexes as needed
- **Accessibility**: All new UI components must be WCAG 2.1 AA compliant

---

*Last Updated: [Current Date]*
*Maintained by: Development Team*

