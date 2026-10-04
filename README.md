# SENTINEL LOGIX
### AI-Powered Predictive & Resilient Forward Logistics Decision System
**Smart India Hackathon 2026 Prototype – Indian Army Forward Supply Chain Resilience**

---

## 🎯 Problem Statement & Strategic Context
**Difficulty in maintaining assured and timely logistics support to forward formations across geographically dispersed and operationally challenging areas.**

In high-altitude operational sectors such as **Headquarters 14 Corps (Ladakh, Siachen Glacier, Kargil, Daulat Beg Oldi [DBO], Galwan Valley)**, logistics operations confront extreme sub-zero temperatures (-40°C), avalanches, unpredictable mountain pass closures (Zojila, Khardung La, Chang La), single-road dependencies, and fragmented telemetry across disparate legacy systems (IQMP, MISO).

---

## 💡 Core Philosophy & Positioning
> **"We are not replacing existing Army logistics systems (IQMP, MISO); we are adding an AI-powered predictive resilience layer that converts fragmented logistics signals into early warnings, what-if simulations, adaptive pre-positioning and explainable, human-approved contingency decisions."**

### The Four Critical Operational Questions SENTINEL LOGIX Solves:
1. **What could go wrong?** &rarr; Identifies imminent pass closures, fuel freezing risks, bridge breaches, and forward stockout trajectories.
2. **When could the problem happen?** &rarr; Pinpoints exact critical point timelines (e.g. *Siachen POL stockout in 2.8 days*).
3. **What happens if it happens?** &rarr; Multi-factor counterfactual **What-If Scenario Simulator** stress-testing system-wide impacts.
4. **What should we do BEFORE it happens?** &rarr; Generates **Adaptive Pre-Positioning** plans to preemptively re-route convoys and air-lift supplies before weather windows collapse.

---

## 🚀 Key Standout Features

### 1. 🌐 Forward Logistics Digital Twin (Living Predictive Model)
- **Multi-Tier Network Graph**: Visualizes Tier 1 (Central Base Railheads: Pathankot, Udhampur), Tier 2 (Intermediate Staging Hubs: Leh, Srinagar, Tezpur), and Tier 3 (Forward Operating Posts: Siachen Base, DBO, Kargil, Dras, Galwan, Nyoma ALG, Chushul).
- **Dual Perspective**: Toggle between **Interactive Tactical Network Graph** (with dynamic risk-colored routes and animated supply flows) and **Geo-Spatial Terrain Radar** (with GPS coordinates, pass elevations, and mountain axes).
- **Interactive Deep Drawer**: Slide-out analysis for any formation showing 5-pillar resilience, stockout probability, daily burn rates, and SHAP-based explainable risk drivers.

### 2. ⚡ What-If Scenario Stress Simulator (Star Feature)
- **Hazard Scenarios**: Primary Route Disruption (Zojila Pass NH-1D), Extreme Sub-zero Blizzard (-38°C), Heavy Transport / Bridge Failure (Shyok KM-120), Sudden Munitions Demand Surge (+250%).
- **Multi-Factor Variable Sliders**: Adjust snowfall accumulation, route closure probability, and tactical demand multipliers.
- **Before vs After Trajectory**: Comparative area charts visualizing risk mitigation with Sentinel Logix adaptive pre-positioning versus unmanaged disruption.
- **Direct Contingency Commitment**: 1-click generation of military contingency directives sent straight to the Action Center.

### 3. 🎯 Human-in-the-Loop Action Center (Explainable AI)
- Complete **5W Defence Directive Breakdown**:
  - **WHAT**: Cargo class and volume (e.g., *42,000 Litres Arctic-Grade Diesel*).
  - **WHERE**: Origin and destination axis (e.g., *Leh Staging Hub ➔ Siachen Base Camp*).
  - **HOW MUCH**: Transport assets (e.g., *6x Tatra 8x8 All-Terrain High-Mobility Tankers + 2x Mi-17V5 Sorties*).
  - **WHEN**: Concrete execution window (e.g., *050400Z OCT to 051100Z OCT before Khardung La freeze*).
  - **WHY**: Explainable AI feature contribution percentages (SHAP attribution weights).
- **Officer Controls**: `Approve & Dispatch` (with PIN verification), `Modify Directive` (adjust payload / vehicles), `Reject / Override` (with required justification).

### 4. 🛡️ Dynamic 5-Pillar Logistics Resilience Score
Each forward formation is evaluated continuously across 5 core dimensions:
1. **Inventory Resilience** (Buffer depth & burn rate tolerance)
2. **Transport Resilience** (Fleet mobility & airlift asset availability)
3. **Weather Resilience** (Sub-zero freeze & avalanche tolerance)
4. **Demand Resilience** (Readiness surge capacity)
5. **Route Resilience** (Alternative bypass corridors like Shinku La/Atal Tunnel)
- Side-by-side radar benchmark charts and comprehensive vulnerability ranking matrix.

### 5. 🔒 Tamper-Evident Defence Audit Ledger & Offline Mesh Continuity
- **Cryptographic Provenance**: Every approval, modification, simulation, and policy override is stamped with an immutable **SHA-256 block hash**.
- **Official Movement Directive (Army Form LOG-2026/A)**: Formatted, printable/exportable manifest complete with military seals, digital PIN signatures, and convoy manifests.
- **Offline Field Mesh Continuity**: Persistent indicator and toggle between *Online SATCOM Mil-Net* and *Offline Tactical Field Mesh*, with conflict-aware local transaction queue and peer-to-peer resynchronization.

---

## 🛠️ Technology Stack
- **Frontend Core**: React 19 + Vite
- **Styling**: Tailwind CSS v4 with bespoke Military Command HUD design system (tactical brackets, scanlines, reticles, radar glow indicators)
- **Charts & Telemetry**: Recharts (Area charts, Radar charts)
- **Icons & Visuals**: Lucide React
- **State Management**: Centralized React Context with multi-role authentication & live mock AI prediction engine
- **Tactile Feedback**: Web Audio API synthesized tactical audio bleeps and Canvas Confetti

---

## 🏃 Quick Start Guide

### 1. Installation
```bash
npm install
```

### 2. Development Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🎬 Recommended Hackathon Demo Flow (5-Minute Winning Pitch)
1. **Login & Role Selection**: Experience the classified military authentication terminal and select **Logistics Officer (Col. Vikram Rathore, SM)** or use the 1-click evaluator entry.
2. **Command Center Overview**: Inspect the **Theatre Health Index (78%)**, notice the **Critical Formations (Siachen & DBO)**, and review mountain pass telemetry.
3. **Explore Digital Twin**: Click on **Siachen Base Camp** to open the slide-out drawer; examine the **89.4% Stockout Risk**, the **5-Pillar Resilience breakdown**, and the explainable AI feature weights. Switch to **Geo-Spatial Terrain Radar** to view mountain passes.
4. **Execute What-If Simulation**: Navigate to the **What-If Simulator**, select the **Zojila Pass Disruption Scenario**, and click **RUN TACTICAL RESILIENCE SIMULATION**. Observe the Before vs After mitigation chart and click **Send Directive to Action Center**.
5. **Human-in-the-Loop Action Center**: In the Action Center, inspect the **5W breakdown**, click **APPROVE & DISPATCH**, enter PIN `5489`, and watch the directive commit to the blockchain-style ledger.
6. **Inspect Tamper-Evident Audit Log**: Open the Audit Log, verify the **SHA-256 cryptographic hash**, click **Army Manifest** to preview the printable official military dispatch directive, and toggle **Offline Field Mesh** mode to showcase disconnected frontline resilience.

---

*Developed for Smart India Hackathon 2026. Built with precision for the Indian Army Northern & Eastern Logistics Commands.*
