# Security design and scope

This version is a static educational application. It has no authentication, API, upload endpoint, payment processing or lead-collection form. It does not request sensitive identity documents. Calculator and search values are rendered through React escaping; unsanitized HTML is not used. Numeric models reject nonfinite, negative and oversized inputs and undefined divisions.

Resource URLs are centralized, HTTPS-only and inspected by content/link checks. New-tab links use `noopener noreferrer`. Local progress accepts only bounded arrays of string identifiers and handles unavailable/corrupt storage. No API keys or secrets belong in this client bundle or public content.

`public/_headers` supplies CSP, anti-framing, MIME-sniffing, permissions and referrer controls for hosts supporting that format. **These files do not establish that headers are active on every host.** Verify response headers after deployment. The CSP allows inline styles for dynamic progress values, but scripts are restricted to same-origin. GitHub Pages cannot configure these headers directly; use an appropriate hosting layer if these controls are required there. HTTPS enforcement and HSTS belong to the actual hosting environment.

## Intentional future backend boundary

Before introducing contact forms or accounts, create a server-side validation schema, content-type and body-size limits, origin allowlist, abuse controls and endpoint rate limits. Use an edge-backed/shared limiter, not process-local memory. Add CSRF protection for cookie-authenticated mutations; secure, HttpOnly, SameSite cookies; least-privilege authorization; safe error responses; redacted logs; explicit retention and deletion policies; and meaningful privacy disclosures. Never trust client validation alone. Verify API errors, limit responses and authorization failures in integration tests.

Any document-upload capability needs authenticated authorization, strict permitted types/sizes, malware scanning, isolated private storage and limited signed retrieval links. Do not enable collection of identity documents or insurance policy numbers before a reviewed secure workflow exists. A carrier packet lesson is not an upload portal.

## Review limits

Dependency auditing and source/security checks are review evidence, not a penetration test or proof of complete security. Re-run audits when dependencies or infrastructure change. Automated accessibility checks are not WCAG certification. Confirm the production hosting configuration separately.
