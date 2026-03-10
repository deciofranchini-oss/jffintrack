/**
 * Global application state (must be loaded before feature modules).
 * Provides defaults only (no behavior changes).
 *
 * IMPORTANT: declare with var to create a true global binding accessible as `state`
 * across classic <script> files.
 */
// eslint-disable-next-line no-var
var state = window.state || {
  user: null,
  profile: null,
  familyId: null,

  // Core data caches
  accounts: [],
  accountGroups: [],
  categories: [],
  payees: [],
  transactions: [],
  scheduled: [],
  budgets: [],

  // UI & preferences
  ui: { currentPage: 'dashboard' },
  prefs: {},
  lastCategoryByPayee: {},

  // Reports
  chartInstances: {},

  // Generic caches / helpers
  cache: {},
  flags: {}
};

window.state = state;

// Ensure containers exist (when reloaded / older localStorage state, etc.)
state.accounts = state.accounts || [];
state.accountGroups = state.accountGroups || [];
state.categories = state.categories || [];
state.payees = state.payees || [];
state.transactions = state.transactions || [];
state.scheduled = state.scheduled || [];
state.budgets = state.budgets || [];
state.chartInstances = state.chartInstances || {};
state.ui = state.ui || { currentPage: 'dashboard' };
state.cache = state.cache || {};
state.flags = state.flags || {};
