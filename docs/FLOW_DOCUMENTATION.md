# Flow Codebase Flow Documentation

## Overview
Flow is an open-source Cursor alternative built as a fork of VSCode. It provides AI-powered coding assistance with features like chat, autocomplete, quick edit (Ctrl+K), and apply functionality.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FLOW ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   BROWSER       │    │   ELECTRON      │    │   COMMON     │ │
│  │   PROCESS       │    │   MAIN PROCESS  │    │   SERVICES   │ │
│  │                 │    │                 │    │              │ │
│  │ • React UI      │◄──►│ • LLM Providers │    │ • Settings   │ │
│  │ • Sidebar       │    │ • File System   │    │ • Models     │ │
│  │ • Editor        │    │ • IPC Channels  │    │ • Types      │ │
│  │ • Services      │    │ • Tools         │    │ • Utils      │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Core Services Flow

### 1. Main Entry Points

**Browser Process:**
- `src/vs/workbench/contrib/flow/browser/flow.contribution.ts` - Main contribution file that registers all Flow services
- `src/vs/workbench/contrib/flow/browser/sidebarPane.ts` - Registers the sidebar view pane

**Electron Main Process:**
- `src/vs/workbench/contrib/flow/electron-main/llmMessage/sendLLMMessage.impl.ts` - Handles LLM communication
- `src/vs/workbench/contrib/flow/electron-main/sendLLMMessageChannel.ts` - IPC channel for LLM messages

### 2. Key Services Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        SERVICE LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │  EditCodeService │    │ LLMMessageService│    │FlowSettings  │ │
│  │                 │    │                 │    │   Service     │ │
│  │ • Apply Changes │◄──►│ • Send Messages │◄──►│ • Model Config│ │
│  │ • Diff Zones    │    │ • Stream Results│    │ • Provider    │ │
│  │ • Fast/Slow     │    │ • Handle Errors │    │   Settings    │ │
│  │   Apply         │    │ • Abort Requests│    │ • Global      │ │
│  └─────────────────┘    └─────────────────┘    │   Settings    │ │
│           │                       │             └──────────────┘ │
│           │                       │                       │      │
│           ▼                       ▼                       ▼      │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │  SidebarPane    │    │  ChatThread     │    │  FlowModel   │ │
│  │                 │    │   Service       │    │   Service    │ │
│  │ • React Mount   │    │ • Thread History│    │ • File       │ │
│  │ • View Container│    │ • Message State │    │   Operations │ │
│  │ • Layout        │    │ • Stream State  │    │ • URI        │ │
│  └─────────────────┘    └─────────────────┘    │   Management │ │
│                                                 └──────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## User Interaction Flow

### 1. Chat Flow (Ctrl+L)

```
User Input → SidebarChat → ChatThreadService → LLMMessageService → Electron Main → LLM Provider
     ↓              ↓              ↓              ↓              ↓
React UI ← ChatMarkdownRender ← Stream Events ← IPC Channel ← Response Stream
```

**Detailed Steps:**
1. User types in sidebar chat (`SidebarChat.tsx`)
2. Message sent to `ChatThreadService` for state management
3. `LLMMessageService` handles the request via IPC
4. Electron main process (`sendLLMMessage.impl.ts`) communicates with LLM provider
5. Streamed response flows back through the same chain
6. `ChatMarkdownRender` displays the response with apply buttons

### 2. Quick Edit Flow (Ctrl+K)

```
User Selection → QuickEditActions → EditCodeService → LLMMessageService → Apply Changes
     ↓              ↓              ↓              ↓              ↓
Editor Widget ← DiffZone ← Stream Response ← IPC Channel ← LLM Provider
```

**Detailed Steps:**
1. User selects code and presses Ctrl+K
2. `QuickEditActions` creates a `CtrlKZone` in `EditCodeService`
3. System message + user selection sent to LLM
4. Response streamed back and applied to the diff zone
5. User can accept/reject changes

### 3. Apply Flow

```
Apply Button → EditCodeService → Fast/Slow Apply → Model Changes → Diff Visualization
     ↓              ↓              ↓              ↓              ↓
ChatMarkdown ← Search/Replace ← File Rewrite ← TextModel ← Editor Update
```

**Two Apply Modes:**
- **Fast Apply**: Uses search/replace blocks for quick changes
- **Slow Apply**: Rewrites entire file for complex changes

## React Component Hierarchy

```
Sidebar (main container)
├── SidebarChat (chat interface)
│   ├── PastThreadsList (thread history)
│   ├── ChatMarkdownRender (message display)
│   │   ├── ApplyBlockHoverButtons (apply/reject)
│   │   └── ToolMessage (tool call display)
│   └── ModelDropdown (model selection)
├── FlowSettings (settings panel)
│   ├── ModelDropdown
│   ├── WarningBox
│   └── ToolApprovalTypeSwitch
└── ErrorBoundary (error handling)
```

## Data Flow Patterns

### 1. Settings Management
```
FlowSettingsService (singleton)
├── Provider Settings (API keys, endpoints)
├── Model Selections (per feature)
├── Global Settings (UI preferences)
└── MCP User State (Model Context Protocol)
```

### 2. LLM Communication
```
Browser Process                    Electron Main Process
├── LLMMessageService              ├── sendLLMMessage.impl.ts
├── IPC Channel                    ├── Provider SDKs
└── Event Hooks                    └── Stream Handling
```

### 3. File Operations
```
FlowModelService
├── URI Management
├── Text Model Access
├── File Writing
└── Change Tracking
```

## Key Features Implementation

### 1. Autocomplete
- Integrated with VSCode's completion system
- Uses FIM (Fill-in-the-Middle) models
- Streams completions in real-time

### 2. Context Gathering
- Automatically includes relevant files
- Uses directory structure analysis
- Supports MCP (Model Context Protocol) tools

### 3. Tools Integration
- Built-in tools: Edit, Search, Terminal, etc.
- MCP tools for external integrations
- Approval system for tool execution

### 4. Thread Management
- Persistent chat history
- Thread-based conversations
- Checkpoint system for code changes

## Error Handling

```
ErrorBoundary (React)
├── ErrorDisplay (UI)
├── Console Logging
└── Graceful Degradation
```

## Build System

```
Gulp Tasks
├── compile (TypeScript compilation)
├── watch (development mode)
├── extensions (built-in extensions)
└── web (web version)
```

## Key Files Summary

### Browser Process
- `flow.contribution.ts` - Main service registration
- `sidebarPane.ts` - Sidebar view container
- `editCodeService.ts` - Code editing and diff management
- `chatThreadService.ts` - Chat state management
- `autocompleteService.ts` - Autocomplete functionality

### Electron Main Process
- `sendLLMMessage.impl.ts` - LLM provider implementations
- `sendLLMMessageChannel.ts` - IPC communication
- `flowSCMMainService.ts` - Source control integration

### Common Services
- `flowSettingsService.ts` - Settings management
- `sendLLMMessageService.ts` - LLM communication interface
- `flowModelService.ts` - File operations
- `modelCapabilities.ts` - Model configuration

### React Components
- `Sidebar.tsx` - Main sidebar container
- `SidebarChat.tsx` - Chat interface
- `ChatMarkdownRender.tsx` - Message rendering
- `Settings.tsx` - Settings panel

## Development Workflow

1. **Setup**: Run `npm install` and `npm run watch`
2. **Development**: Use `npm run watchd` for daemon mode
3. **Testing**: Use `npm run test-*` scripts
4. **Building**: Use `npm run compile` for production builds

## Integration Points

- **VSCode**: Extends VSCode's workbench and editor
- **Electron**: Uses Electron for desktop app functionality
- **React**: UI components built with React and Tailwind CSS
- **Monaco**: Uses Monaco editor for code editing
- **IPC**: Communication between browser and main processes

This architecture provides a robust foundation for AI-powered coding assistance while maintaining compatibility with VSCode's ecosystem.
