# ReserNova Business Health Check

Build a modern SaaS web application called ReserNova Business Diagnostic.

The purpose of this application is to help the ReserNova sales team understand salon/beauty-business clients, identify their operational problems, quantify the financial impact of those problems, qualify the lead, and recommend the most relevant ReserNova products/plans.

Website/product context:
ReserNova is a Moroccan SaaS platform for beauty businesses. It provides:

AI Receptionist / AI Booking Assistant

WhatsApp booking automation

Smart Calendar

Appointment management

Automated reminders

Team/staff management

CRM

Customer history

Revenue/business analytics

Multi-location management

Reference website:
https://www.resernova.info/en

IMPORTANT:
This is NOT a simple Google Forms-style questionnaire.
It must feel like a premium modern SaaS onboarding/diagnostic experience.

==================================================

CORE EXPERIENCE
==================================================

Create a multi-step interactive diagnostic wizard.

Target completion time:
5–7 minutes maximum

The experience should feel:

Premium

Modern

Fast

Conversational

Simple

Trustworthy

Mobile-friendly

Professional enough to use with real salon owners during sales meetings

The application should progressively discover the client's problems.

Do NOT aggressively sell ReserNova at the beginning.

The flow should be:

Business Profile
→ Operations
→ Booking Process
→ Missed Opportunities
→ No-Shows
→ CRM / Customer Management
→ Growth
→ Buying Intent
→ Business Diagnosis
→ ROI Estimate
→ ReserNova Recommendation
→ Lead Capture / Demo CTA

The client should feel that the application is helping them understand their own business.

==================================================
2. LANGUAGES

The entire application must support:

🇬🇧 English
🇫🇷 Français
🇲🇦 العربية / Darija

Create a language selector in the top-right corner.

Languages must be switchable at any time without losing progress or answers.

IMPORTANT FOR ARABIC:

Arabic must use proper RTL layout.

When Arabic is selected:

Entire application switches to RTL

Text alignment becomes RTL

Progress stepper works correctly in RTL

Navigation arrows should reverse

Form fields support RTL

Numbers remain readable

Charts remain readable

Cards and layouts should adapt properly

Do NOT simply translate English text mechanically.

The Arabic/Darija version should sound natural for Moroccan salon owners.

Examples:

English:
"Where do your clients usually contact you when they want to book?"

French:
"Par quel moyen vos clients vous contactent-ils généralement pour prendre rendez-vous ?"

Moroccan Arabic/Darija:
"فين كيتواصلو معاك الزبناء غالباً باش ياخدو موعد؟"

Possible answers:

WhatsApp
واتساب

Instagram
إنستغرام

Phone
التلفون

Walk-in
كيجيو للصالون مباشرة

Website
الموقع

Other
شي حاجة أخرى

Create a proper translation system with translation keys, NOT hardcoded text.

Example:

{
"business.title": {
"en": "...",
"fr": "...",
"ar": "..."
}
}

All UI labels, questions, buttons, errors, validation messages, results, recommendations and dashboard text must be translated.

==================================================
3. VISUAL DESIGN

Design inspiration:

Linear

Stripe

Notion

Modern fintech/SaaS onboarding

Premium CRM interfaces

Do NOT make it look like:

Google Forms

Typeform clone

Old enterprise software

Generic Bootstrap dashboard

Use ReserNova's visual identity.

Primary colors:

Emerald Teal: #0EA5A4

Deep Blue: #2563EB

Soft Gold: #F59E0B

Use these carefully.

Main UI should be clean and mostly light.

Use:

Large typography

Rounded cards

Subtle shadows

Soft borders

Generous spacing

Smooth transitions

Micro animations

Interactive inputs

Progress indicators

Modern icons

Avoid excessive gradients.

Avoid excessive colorful cards.

The UI should feel sophisticated.

==================================================
4. FORM LAYOUT

Desktop:

Left side:
A vertical progress stepper.

Example:

01
Business

02
Operations

03
Bookings

04
Revenue Leakage

05
No-Shows

06
Customers

07
Growth

08
Results

Right side:
Large question card.

Example:

"How many appointment requests do you receive every week?"

Then:

[ 120 ]

interactive slider / number selector

Small helper text:

"This helps us estimate how much booking demand your business handles."

Bottom:

← Back Continue →

On mobile:
The stepper becomes a compact top progress bar.

Example:

Step 3 of 8
████████░░░░░░

==================================================
5. STEP 1 — BUSINESS PROFILE

Title:

"Let's start with your business"

Collect:

Business name

Owner / decision maker name

Phone number

WhatsApp number

Email

City

Neighborhood

Business type

Number of locations

Website

Instagram

Facebook

Years in business

Business types:

Hair Salon

Barber

Beauty Salon

Nail Salon

Spa

Hammam

Massage

Aesthetic / Laser

Other

Use conditional questions where appropriate.

Do not overwhelm the user.

==================================================
6. STEP 2 — TEAM & OPERATIONS

Title:

"Let's understand how your business operates"

Questions:

How many people currently work in your business?

Answers:

Just me

2–3

4–7

8–15

15+

How many people provide services?

How many hours do you operate per day?

How many days per week?

Do employees have individual schedules?

How do you currently manage employee availability?

Answers:

Notebook

WhatsApp

Excel

Google Calendar

Another software

Nothing specific

How do you prevent double bookings?

Answers:

Calendar software

Manual checking

WhatsApp

Notebook

We sometimes have conflicts

We don't have a system

The system should identify operational pain automatically.

==================================================
7. STEP 3 — BOOKING DISCOVERY

Title:

"How do your clients book appointments?"

Multiple selection:

WhatsApp

Phone

Instagram

Facebook

Walk-ins

Website

Booking platform

Other

Question:

"Approximately how many appointment requests do you receive every week?"

Interactive number slider.

Question:

"How quickly do you usually respond to WhatsApp booking requests?"

Answers:

Immediately

Less than 5 minutes

5–15 minutes

15–30 minutes

30–60 minutes

More than 1 hour

Sometimes the next day

Question:

"Who usually handles booking messages?"

Me

Receptionist

Staff members

Multiple people

Nobody specifically

==================================================
8. STEP 4 — MISSED OPPORTUNITIES

This section is extremely important.

Do NOT directly ask:

"Do you lose clients?"

Instead ask behavioral questions.

Question:

"During busy hours, what happens when a new client sends a WhatsApp message?"

Answers:

I answer immediately

Someone on my team answers

We answer when we're free

Sometimes we forget

We often miss messages

Question:

"Have you ever discovered a WhatsApp message hours later and realized the client wanted to book?"

Answers:

Never

Rarely

Sometimes

Often

Very often

Question:

"Approximately how many booking requests do you think you don't convert each month?"

Interactive slider.

Question:

"What is the average value of one appointment?"

Currency:
MAD / DH

Then dynamically calculate:

Estimated missed revenue =
missed booking requests × average appointment value

Display:

"Based on your answers..."

"Estimated missed revenue"

4,500 DH / month

Use a subtle animated counter.

Add disclaimer:

"This is an estimate based on the information you provided and is not a guaranteed result."

==================================================
9. STEP 5 — NO-SHOWS

Title:

"Let's look at missed appointments"

Questions:

How many appointments do you handle per month?

Approximately how many clients don't show up?

Do you send appointment reminders?

How are reminders sent?

Calculate:

No-show rate

Estimated revenue affected by no-shows.

Example:

Appointments:
400

No-shows:
30

No-show rate:
7.5%

Average appointment:
250 DH

Estimated affected revenue:
7,500 DH/month

Again clearly label this as an estimate.

==================================================
10. STEP 6 — CRM & CUSTOMER MANAGEMENT

Title:

"How well do you know your clients?"

Questions:

"Where do you keep information about your clients?"

Answers:

Nowhere

Phone contacts

WhatsApp

Notebook

Excel

Another software

CRM

"Can you see a client's previous appointments?"

Yes / No

"Can you see how much a client has spent with your business?"

Yes / No

"Can you identify clients who haven't visited recently?"

Yes / No

"Do you send personalized offers to existing clients?"

Never

Rarely

Sometimes

Frequently

Question:

"If a client hasn't visited for 60 days, would you like to automatically identify them and contact them?"

Yes / No

Use these answers to detect CRM opportunity.

==================================================
11. STEP 7 — GROWTH & BUSINESS

Title:

"Where do you want your business to go?"

Questions:

Monthly revenue range:

Under 10,000 DH

10,000–25,000 DH

25,000–50,000 DH

50,000–100,000 DH

100,000–250,000 DH

250,000+ DH

Do NOT require exact revenue.

Question:

"What is your biggest challenge right now?"

Multiple selection:

Getting new clients

Keeping existing clients

Managing bookings

No-shows

Staff management

WhatsApp messages

Increasing revenue

Managing multiple locations

Understanding business performance

Question:

"Are you planning to open another location?"

Answers:

Yes, within 12 months

Yes, eventually

Maybe

No

==================================================
12. STEP 8 — BUYING INTENT

Title:

"One last thing"

Question:

"Who usually makes decisions about new software?"

Me

My partner

Manager

Someone else

Question:

"If you found a solution that could save time and increase revenue, when would you consider implementing it?"

Immediately

This month

Within 3 months

3–6 months

Just researching

Question:

"What would prevent you from adopting a new system?"

Multiple selection:

Price

Difficult to use

Team won't use it

Don't want to change WhatsApp

Don't trust automation

Need specific features

Need to discuss with partner

Nothing

These answers should be stored as sales objections.

==================================================
13. INTELLIGENT CONDITIONAL LOGIC

The questionnaire must NOT ask irrelevant questions.

Examples:

If:

number_of_locations = 1

Skip multi-location questions.

If:

uses_whatsapp = false

Skip detailed WhatsApp questions.

If:

employees = 1

Skip advanced team management questions.

If:

uses_crm = true

Ask which CRM and what they like/dislike about it.

If:

no_shows = 0

Do not ask detailed no-show questions.

If:

monthly_revenue = high

Ask more advanced growth and multi-location questions.

The form should dynamically adapt.

Target:
5–7 minutes.

==================================================
14. LEAD SCORING ENGINE

Create a scoring engine.

Score from 0 to 100.

Categories:

Business size: 0–20
Booking volume: 0–20
WhatsApp dependency: 0–15
Missed booking pain: 0–15
No-show pain: 0–10
CRM maturity: 0–10
Growth potential: 0–5
Buying urgency: 0–5

Total:
100

Lead classification:

80–100:
HOT

60–79:
QUALIFIED

40–59:
NURTURE

0–39:
LOW PRIORITY

Store all scoring details, not only the final score.

==================================================
15. PAIN POINT DETECTION

Automatically identify pain points.

Examples:

If WhatsApp dependency is high + response time is slow:

Pain:
"Missed WhatsApp opportunities"

Severity:
High

Recommended product:
AI Receptionist

If no-show rate > 5%:

Pain:
"High no-show rate"

Recommended:
Automated reminders

If calendar management is manual:

Pain:
"Manual scheduling"

Recommended:
Smart Calendar

If no CRM:

Pain:
"Limited customer visibility"

Recommended:
CRM

If multiple locations:

Pain:
"Multi-location management"

Recommended:
Multi-location tools / Custom plan

==================================================
16. RESULTS PAGE

This is the most important screen.

Do NOT simply say:

"Thank you for completing the form."

Create a beautiful:

Business Diagnosis

Show:

Overall Business Score

Example:

64 / 100

Then category scores:

Operations
████████░░
78

Bookings
██████░░░░
62

Customer Retention
█████░░░░░
48

Revenue Visibility
████░░░░░░
42

Use elegant visualizations.

==================================================
17. BIGGEST OPPORTUNITIES

Show 3 biggest detected problems.

Example:

Missed WhatsApp Bookings

"You receive approximately 120 booking requests per month, but your current response process may cause around 18 opportunities to be missed."

Estimated opportunity:

4,500 DH / month

No-Shows

Estimated impact:

2,000 DH / month

Customer Retention

"You currently don't have a reliable system for identifying clients who haven't returned."

Potential:
Automated reactivation campaigns.

==================================================
18. RESERNOVA RECOMMENDATION

Only after showing the problems, introduce ReserNova.

Title:

"How ReserNova can help"

Create personalized recommendation cards.

Example:

AI Receptionist
HIGH PRIORITY

"Automatically answer booking requests and help clients book appointments through WhatsApp."

Smart Calendar
HIGH PRIORITY

"Manage availability and reduce scheduling conflicts."

CRM
HIGH PRIORITY

"Keep customer history, understand client behavior and identify retention opportunities."

Automated Reminders
MEDIUM PRIORITY

"Reduce no-shows with automated appointment reminders."

==================================================
19. ROI CALCULATOR

Create a beautiful financial impact card.

Example:

Estimated missed bookings:
18/month

Average appointment:
250 DH

Potential missed revenue:
4,500 DH/month

No-show impact:
2,000 DH/month

Total estimated opportunity:

6,500 DH / month

Then compare to ReserNova pricing.

Starter:
299 DH/month

Pro:
549 DH/month

Do not claim guaranteed ROI.

Display:

"Potential opportunity based on your answers"

NOT:

"You will make 6,500 DH."

Calculate:

Potential opportunity / plan price

Example:

6,500 / 299 = 21.7x

Label:

"Estimated opportunity-to-cost ratio"

==================================================
20. PLAN RECOMMENDATION

Automatically recommend:

Starter
Pro
Custom

Rules:

Starter:
Small business
1 location
Low/moderate booking volume

Pro:
Higher booking volume
Multiple staff
Higher operational complexity
More CRM needs
Up to 2 locations

Custom:
Multiple locations
Large team
High volume
Complex requirements

Show:

"Recommended for your business"

PRO

549 DH/month

Include CTA:

"Book a ReserNova Demo"

Secondary CTA:

"Talk to a ReserNova Specialist"

==================================================
21. LEAD CAPTURE

Before showing the full report, collect:

Name

Business name

WhatsApp

Email

City

Allow:

"Send my business report to me"

CTA.

Store everything in database.

==================================================
22. INTERNAL SALES DASHBOARD

Create a separate authenticated dashboard for ReserNova staff.

Dashboard sections:

Overview
Leads
Diagnostics
Analytics
Settings

Lead table:

Business
Owner
City
Score
Priority
Recommended Plan
Main Pain
Buying Intent
Created
Status

Statuses:

New
Contacted
Demo Scheduled
Trial
Won
Lost
Nurture

==================================================
23. LEAD DETAIL PAGE

When sales staff open a lead:

Show:

Business Profile

Lead Score:
87 / 100

Priority:
🔥 HOT

Recommended Plan:
PRO

Buying Intent:
Immediate

Main Pain Points:

🔴 Missed WhatsApp bookings
🟠 No-shows
🔴 No CRM

Estimated opportunity:

8,400 DH/month

Then show every answer from the questionnaire.

Also show:

"Recommended sales approach"

Example:

Primary angle:
"Focus on missed WhatsApp bookings and response time."

Objection:
"Will my WhatsApp number change?"

Recommended response:
Explain that ReserNova is designed to work with WhatsApp Business workflows.

Next action:
Book demo.

==================================================
24. SALES INSIGHTS

Automatically generate:

Lead summary

Main pain points

Recommended ReserNova features

Recommended plan

Estimated opportunity

Buying intent

Main objections

Suggested sales angle

Keep these rule-based initially.

Structure the database so AI-generated summaries can be added later.

==================================================
25. DATABASE

Use Supabase.

Create tables similar to:

businesses

diagnostics

diagnostic_answers

leads

lead_scores

pain_points

recommendations

sales_notes

appointments

users

translations

Each diagnostic should have a unique ID.

Store:

question ID

answer

timestamp

language

diagnostic ID

Do not store only the final result.

==================================================
26. SECURITY

Client diagnostic should be publicly accessible through a unique URL.

Example:

/diagnostic/:id

Sales dashboard must require authentication.

Do not expose other clients' information.

Use Supabase Row Level Security.

Sales users can only access authorized lead data.

==================================================
27. RESPONSIVE DESIGN

Must work beautifully on:

Desktop

Laptop

Tablet

Mobile

Mobile is especially important because salespeople may complete the diagnostic together with a salon owner on a phone.

==================================================
28. ANIMATIONS

Use subtle animations:

Step transitions

Progress bar animation

Number counter

Score animation

Card entrance

Button hover

Selection feedback

Do NOT overanimate.

Transitions should feel premium and fast.

==================================================
29. UX DETAILS

Every question should have:

Clear title

Optional helper text

Simple answer interaction

Visible progress

Back button

Continue button

For simple choices:
Use large selectable cards.

For numeric answers:
Use slider + number input.

For multiple selections:
Use checkboxes/cards.

For Yes/No:
Use large segmented buttons.

Avoid tiny form controls.

Keyboard navigation should work.

Add validation.

Never allow users to accidentally lose progress.

Autosave answers.

If the user refreshes the page, restore the diagnostic session.

==================================================
30. TRUST / PRIVACY

Before starting:

"This diagnostic takes about 5–7 minutes."

Add:

"Your answers are used to understand your business and prepare a personalized ReserNova recommendation."

Do not make misleading claims.

ROI calculations must clearly be estimates.

==================================================
31. EMPTY / ERROR STATES

Create polished states for:

Loading

Saving

Network error

Session expired

Diagnostic completed

Invalid diagnostic link

Unauthorized dashboard access

No leads

No search results

==================================================
32. ADMIN / QUESTION MANAGEMENT

Create an admin interface where ReserNova staff can:

Create questions

Edit questions

Enable/disable questions

Change order

Configure conditional logic

Configure scoring

Configure translations

Configure recommendation rules

Questions should NOT be hardcoded directly into components.

Store question configuration in database.

==================================================
33. QUESTION DATA MODEL

Each question should support:

id
step
type
title_en
title_fr
title_ar
description_en
description_fr
description_ar
options
required
order
condition
scoring_rules
pain_point_rules
product_rules

Question types:

single_choice
multiple_choice
number
currency
slider
yes_no
text
email
phone
url

==================================================
34. IMPORTANT SALES PRINCIPLE

The application should follow this psychological flow:

Understand the business

Ask about current process

Discover friction

Quantify the problem

Show financial impact

Identify priority

Introduce the appropriate ReserNova solution

Recommend a plan

Ask for the next action

Never aggressively sell ReserNova before the diagnosis.

The client should reach the conclusion:

"I actually have a problem here."

Then:

"ReserNova seems like a logical solution."

==================================================
35. FINAL QUALITY REQUIREMENT

Build a production-quality application.

Do not create a basic prototype.

The final result should look like a premium SaaS product that ReserNova can actually use with paying customers.

Use clean reusable components.

Use TypeScript.

Use a proper component architecture.

Use Supabase for persistence/authentication.

Use responsive Tailwind CSS.

Use a modern icon library such as Lucide.

Do not use placeholder lorem ipsum.

All visible content must be real and translated into:

English
French
Moroccan Arabic/Darija

Make Arabic fully RTL.

Seed the database with the complete diagnostic questions, scoring rules, pain-point rules and ReserNova recommendation rules.

After implementation, verify:

English works

French works

Arabic/Darija works

RTL works

Progress works

Conditional logic works

Answers persist

Scoring works

ROI calculation works

Recommendations work

Supabase persistence works

Sales dashboard works

Mobile layout works

The final application should feel like:

"ReserNova Business Health Check"

rather than:

"ReserNova Contact Form."

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
