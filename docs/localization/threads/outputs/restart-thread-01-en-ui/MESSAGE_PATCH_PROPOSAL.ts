/**
 * EN Message Patch Proposal — restart-thread-01-en-ui
 *
 * Reviews every key in src/i18n/messages/{common,settings,home,court,verdict,profile}.ts
 * against the locked Verdict Zero brand and proposes a full English replacement set.
 *
 * Brand rules verified:
 *   - brand_title          → "Verdict Zero"
 *   - brand_subtitle       → "Trial of Truth"
 *   - brand_full_title     → "Verdict Zero: Trial of Truth"
 *   - internal_project_name → "Project_Solomon" (never public-facing)
 *   - Strings with Solomon-as-public-title are NOT introduced.
 *
 * Most existing values are already correct against the new brand. This patch
 * keeps them as-is and proposes minor wording tweaks where the prior thread's
 * EN values read awkwardly in compact UI (combo notices, responsibility
 * labels, fragment requirement).
 *
 * Apply by replacing `en` blocks per namespace in src/i18n/messages/*.ts.
 */

export const enMessagePatch = {
  common: {
    'app.title': 'Verdict Zero: Trial of Truth',
    'brand.internalProjectName': 'Project_Solomon',
    'brand.title': 'Verdict Zero',
    'brand.subtitle': 'Trial of Truth',
    'brand.fullTitle': 'Verdict Zero: Trial of Truth',
    'splash.subtitle': 'COURT SIMULATION GAME',
    'language.selectorLabel': 'Language',
    'language.selectorTitle': 'Select display language',
    'steam.authRequired.title': 'Steam authentication required',
    'steam.authRequired.description': 'Check the Steam client and server authentication state, then try again.',
    'steam.authRequired.retry': 'Retry',
    'steam.authFailedFallback': 'Steam authentication failed.',
    'session.preparing.title': 'Preparing session',
    'session.preparing.description': 'Loading case data and the courtroom environment.',
  },

  settings: {
    'settings.about.credits.title': 'Verdict Zero: Trial of Truth',
    'settings.about.credits.description': 'A replayable courtroom deduction game where you weigh AI testimony against the truth.',
    'settings.language.title': 'Language',
    'settings.language.description': 'Choose the display language for the game UI.',
    'settings.language.displayLanguage': 'Display Language',
    'settings.language.displayLanguageDescription': 'Applies immediately to home, settings, and system UI.',
    'settings.language.current': 'Current Language',
    'settings.language.restartNote': 'Some case text and saved records may refresh after the next screen transition.',
  },

  home: {
    'home.gameTitle': 'Verdict Zero: Trial of Truth',
    'home.tagline': 'Take the bench and weigh every claim against the truth.',
    'pc.home.moreCases': '+{count} more',
    'pc.home.countdown.ready': 'Ready soon',
    'pc.home.countdown.minutesSeconds': '{minutes}m {seconds}s',
    'pc.home.countdown.seconds': '{seconds}s',
    'pc.resolutionConfirm.rollback': 'Reverting to the previous resolution in {seconds}s.',
  },

  court: {
    'pc.notes.unseen': '({count} unverified)',
    'pc.combo.ready': '{count} ready to combine — connect now',
    'pc.combo.potential': '{count} leads still missing — keep investigating',
    'pc.combo.readyPairToast': 'A combinable pair is ready',
    'pc.combo.readyItemsNotice': '{count} combinable items available',
    'pc.combo.readyMaterialsNotice': '{count} combinable materials ready',
    'pc.combo.readyDetailLabel': 'Combinable Item Details',
    'pc.recordSummary.moreConvincing': '{party}’s claim is more convincing.',
    'pc.verdictAdvance.minimumVisible': 'A verdict needs at least {required} revealed disputes. Currently revealed: {visible}.',
    'pc.verdictAdvance.conditionsMissing': 'Verdict conditions are not met yet. Verify each dispute, truth, and evidence first.',
    'pc.verdictAdvance.hidden.title': 'Unrevealed disputes remain',
    'pc.verdictAdvance.hidden.subtitle': 'Before the verdict',
    'pc.verdictAdvance.hidden.body': '{visible} disputes are currently revealed.\\n{hidden} disputes remain hidden.\\n\\nProceed to the verdict anyway?',
    'pc.verdictAdvance.hidden.visibleTag': 'Revealed {count}',
    'pc.verdictAdvance.hidden.hiddenTag': 'Hidden {count}',
    'pc.verdictAdvance.hidden.confirm': 'Proceed Anyway',
    'pc.verdictAdvance.hidden.collapse': 'Hide Verdict Button',
    'pc.verdictAdvance.hidden.keepInvestigating': 'Keep Investigating',
  },

  verdict: {
    'pc.verdict.factOption.partyClaimCorrect': '{party}’s claim is correct',
    'pc.verdict.factOption.partyClaimCorrectWithContradiction': 'This dispute differs from the facts — {party}’s claim is correct',
    'pc.verdict.responsibility.major': 'Primary responsibility: {party}',
    'pc.verdict.responsibility.greater': 'Greater responsibility: {party}',
    'pc.verdict.responsibility.similar': 'Comparable responsibility on both sides',
  },

  profile: {
    'pc.perk.required': '{name} required',
    'pc.profile.fragments.needCount': 'At least {count} required',
  },
} as const
