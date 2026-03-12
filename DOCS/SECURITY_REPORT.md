# QuizVista - Security & Threat Model Report

This report outlines the security considerations, threat models, and secure coding decisions implemented in the QuizVista application.

## 🛡️ 1. Threat Model

### Assets to Protect
1.  **User Credentials:** Simulated login data (passwords, roles) stored in `LocalStorage`.
2.  **Quiz Content:** Teacher-created questions and answers.
3.  **Application State:** Integrity of the scoring system and role-based access.

### Possible Attackers
1.  **Script Kiddies/Malicious Students:** Might attempt to bypass role guards to see quiz answers or edit quizzes.
2.  **Unauthorized Users:** External entities attempting to access the dashboard without credentials.

### List of Possible Threats & Mitigation Strategies

| Threat Type | Description | Mitigation Strategy |
| :--- | :--- | :--- |
| **XSS (Cross-Site Scripting)** | Attacker injects malicious scripts into Quiz titles or questions. | **Vue Template Escaping:** Vue 3's built-in interpolation `{{ }}` automatically escapes HTML, preventing script execution. |
| **Unauthorized Access** | Student attempts to reach `/teacher` dashboard directly via URL. | **Vue Router Guards:** Implemented `beforeEach` navigation guards that verify `userRole` before resolving the route. |
| **Data Tampering** | User manually edits `LocalStorage` to change their role or quiz scores. | **Store Encapsulation:** Critical logic for score calculation is handled within the Pinia store, not solely dependent on client-side triggers. |
| **Broken Authentication** | Session hijacking or predictable password guessing. | **Role-Based Auth (RBAC):** Using explicit role checks throughout the component tree. |

### Security Considerations During Development
- **Defensive Programming:** We assumed any input could be malicious.
- **Principle of Least Privilege:** Students are strictly restricted from the `QuizForm` component and any teacher-specific Pinia actions.

---

## 💻 2. Secure Coding Decisions

### Why we avoided inline HTML injection
We strictly avoided using `v-html` in our templates. By using only standard data binding (`{{ title }}`), we ensure that the browser treats all content as literal text rather than executable HTML, effectively neutralizing XSS as a primary threat vector.

### How we validated user input
- **Type Checking:** Vue’s prop validation ensures components only receive expected data types.
- **Form-Level Validation:** Before saving any quiz, a custom validation engine checks for empty strings, whitespace-only entries, and missing correct answer indices.
- **Simulated Delays:** Added to simulate the behavior of a secure backend and prevent rapid-fire automated submissions.

### Why we avoided exposing sensitive data
- **Encapsulated Auth Store:** User passwords are never displayed in the UI.
- **Selective Rendering:** We use `v-if="authStore.userRole === 'teacher'"` to ensure that sensitive components (like delete buttons) aren't even rendered into the DOM for students, preventing inspection-based discovery.

---

## 🕵️ 3. Thinking Like an Attacker

*"If I were a student attempting to cheat:"*
1. **The 'Inspector' Attack:** I might right-click and 'Inspect' the quiz element to find the correct answer in the HTML.
   - **Our Mitigation:** Answers are only checked in the Pinia store state during the "calculateScore" action, making them harder to find than static HTML attributes.
2. **The 'Direct Navigation' Attack:** I would try typing `/teacher` in the address bar.
   - **Our Mitigation:** Our Router Guard intercepts this immediately and redirects unauthorized roles back to the landing page.
3. **The 'Storage Hijack':** I might try to edit `quiz_app_auth` in the Application tab of dev tools.
   - **Our Mitigation:** While LocalStorage is client-side, the app's reactive state (Pinia) re-verifies role-based component rendering instantly upon navigation, ensuring no simple 'edit' can grant full access to sensitive features.
