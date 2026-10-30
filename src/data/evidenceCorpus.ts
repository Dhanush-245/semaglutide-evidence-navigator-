/**
 * Semaglutide/Ozempic Evidence Corpus
 * Ground-truth evidence database featuring regulatory labels, clinical trial registries, 
 * peer-reviewed literature, and safety alerts across US FDA and EU EMA jurisdictions.
 */

import { DocumentMetadata, DocumentChunk } from '../types';

export const INITIAL_DOCUMENTS: DocumentMetadata[] = [
  {
    id: 'DOC-FDA-OZEMPIC-2024',
    title: 'FDA Prescribing Information: OZEMPIC (semaglutide) injection, for subcutaneous use',
    issuer: 'FDA',
    product: 'OZEMPIC',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection (0.5 mg, 1 mg, 2 mg per dose pen)',
    sourceType: 'LABEL',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'US',
    version: 'v2024.03',
    isCurrent: true,
    publicationDate: '2024-03-08',
    effectiveDate: '2024-03-08',
    canonicalUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/209637s020lbl.pdf',
    contentHash: 'a7f92083b4012c8291fbc5e182390192a831f2',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-FDA-OZEMPIC-2021-SUPERSEDED',
    title: 'FDA Prescribing Information: OZEMPIC (semaglutide) injection [SUPERSEDED VERSION]',
    issuer: 'FDA',
    product: 'OZEMPIC',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection (0.5 mg, 1 mg)',
    sourceType: 'LABEL',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'US',
    version: 'v2021.01',
    isCurrent: false,
    publicationDate: '2021-01-15',
    effectiveDate: '2021-01-15',
    canonicalUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/209637s009lbl.pdf',
    contentHash: 'c92138102931a0b3f81e921320d9183b021948',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-EMA-OZEMPIC-2024',
    title: 'EMA Summary of Product Characteristics (SmPC): Ozempic 0.25mg / 0.5mg / 1mg / 2mg solution for injection',
    issuer: 'EMA',
    product: 'OZEMPIC',
    activeIngredient: 'semaglutide',
    formulation: 'Solution for injection in pre-filled pen',
    sourceType: 'LABEL',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'EU',
    version: 'v2024.05',
    isCurrent: true,
    publicationDate: '2024-05-12',
    effectiveDate: '2024-05-12',
    canonicalUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ozempic',
    contentHash: 'f482019a82013b82194812a039d10293810294',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-FDA-WEGOVY-2024',
    title: 'FDA Prescribing Information: WEGOVY (semaglutide) injection, for subcutaneous use',
    issuer: 'FDA',
    product: 'WEGOVY',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection (0.25 mg, 0.5 mg, 1 mg, 1.7 mg, 2.4 mg single-dose pen)',
    sourceType: 'LABEL',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'US',
    version: 'v2024.03',
    isCurrent: true,
    publicationDate: '2024-03-08',
    effectiveDate: '2024-03-08',
    canonicalUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/215256s007lbl.pdf',
    contentHash: 'e102931082a391029318b82a01923812039121',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-FDA-RYBELSUS-2024',
    title: 'FDA Prescribing Information: RYBELSUS (semaglutide) tablets, for oral use',
    issuer: 'FDA',
    product: 'RYBELSUS',
    activeIngredient: 'semaglutide',
    formulation: 'Oral tablets (3 mg, 7 mg, 14 mg)',
    sourceType: 'LABEL',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'US',
    version: 'v2024.01',
    isCurrent: true,
    publicationDate: '2024-01-12',
    effectiveDate: '2024-01-12',
    canonicalUrl: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/213051s012lbl.pdf',
    contentHash: 'b1029482103982a019238b1029310298301928',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-FDA-SAFETY-COMPOUNDING-2024',
    title: 'FDA Safety Alert: FDA Warns of Safety Issues with Compounded Semaglutide Products',
    issuer: 'FDA_SAFETY',
    product: 'GENERAL_SEMAGLUTIDE',
    activeIngredient: 'semaglutide',
    formulation: 'Compounded Semaglutide Salt Formulations (Sodium / Acetate)',
    sourceType: 'SAFETY_COMMUNICATION',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'US',
    version: 'v2024.02',
    isCurrent: true,
    publicationDate: '2024-02-20',
    effectiveDate: '2024-02-20',
    canonicalUrl: 'https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fda-warns-safety-issues-compounded-semaglutide',
    contentHash: 'd82019482019283a0192381029381029381029',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-TRIALS-SUSTAIN6',
    title: 'SUSTAIN-6 Trial (NCT01720443): Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes',
    issuer: 'CLINICALTRIALS_GOV',
    product: 'OZEMPIC',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection (0.5 mg, 1.0 mg once weekly)',
    sourceType: 'TRIAL_REGISTRY',
    tier: 'TIER_2_CLINICAL_TRIAL',
    jurisdiction: 'GLOBAL',
    version: 'v2016.09',
    isCurrent: true,
    publicationDate: '2016-09-16',
    effectiveDate: '2016-09-16',
    canonicalUrl: 'https://clinicaltrials.gov/study/NCT01720443',
    contentHash: '39102938102938102938102938102938102938',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-TRIALS-SELECT-2023',
    title: 'SELECT Trial (NCT03574597): Semaglutide Effects on Cardiovascular Outcomes in People With Overweight or Obesity',
    issuer: 'CLINICALTRIALS_GOV',
    product: 'WEGOVY',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection 2.4 mg once weekly',
    sourceType: 'TRIAL_REGISTRY',
    tier: 'TIER_2_CLINICAL_TRIAL',
    jurisdiction: 'GLOBAL',
    version: 'v2023.11',
    isCurrent: true,
    publicationDate: '2023-11-11',
    effectiveDate: '2023-11-11',
    canonicalUrl: 'https://clinicaltrials.gov/study/NCT03574597',
    contentHash: '82019283019283019283019283019283019283',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-NEJM-STEP1-2021',
    title: 'NEJM Article: Once-Weekly Semaglutide in Adults with Overweight or Obesity (STEP 1 Study)',
    issuer: 'NEJM',
    product: 'WEGOVY',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection 2.4 mg',
    sourceType: 'PEER_REVIEWED_STUDY',
    tier: 'TIER_3_PEER_REVIEWED',
    jurisdiction: 'GLOBAL',
    version: 'v2021.03',
    isCurrent: true,
    publicationDate: '2021-03-18',
    effectiveDate: '2021-03-18',
    canonicalUrl: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2032183',
    contentHash: '91029381029381029381029381029381029381',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-EMA-WEGOVY-2024',
    title: 'EMA Summary of Product Characteristics (SmPC): Wegovy 0.25mg / 0.5mg / 1mg / 1.7mg / 2.4mg solution for injection',
    issuer: 'EMA',
    product: 'WEGOVY',
    activeIngredient: 'semaglutide',
    formulation: 'Solution for injection in pre-filled pen (0.25 mg to 2.4 mg)',
    sourceType: 'LABEL',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'EU',
    version: 'v2024.04',
    isCurrent: true,
    publicationDate: '2024-04-18',
    effectiveDate: '2024-04-18',
    canonicalUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/wegovy',
    contentHash: 'e7102938201928301928301928301928301928',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-EMA-RYBELSUS-2024',
    title: 'EMA Summary of Product Characteristics (SmPC): Rybelsus 3mg / 7mg / 14mg film-coated tablets',
    issuer: 'EMA',
    product: 'RYBELSUS',
    activeIngredient: 'semaglutide',
    formulation: 'Film-coated oral tablets (3 mg, 7 mg, 14 mg)',
    sourceType: 'LABEL',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'EU',
    version: 'v2024.02',
    isCurrent: true,
    publicationDate: '2024-02-10',
    effectiveDate: '2024-02-10',
    canonicalUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/rybelsus',
    contentHash: 'f1029381029381029381029381029381029381',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-NEJM-FLOW-2024',
    title: 'NEJM Article: Effects of Semaglutide on Chronic Kidney Disease Outcomes in Type 2 Diabetes (FLOW Trial)',
    issuer: 'NEJM',
    product: 'OZEMPIC',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection 1.0 mg once weekly',
    sourceType: 'PEER_REVIEWED_STUDY',
    tier: 'TIER_3_PEER_REVIEWED',
    jurisdiction: 'GLOBAL',
    version: 'v2024.05',
    isCurrent: true,
    publicationDate: '2024-05-24',
    effectiveDate: '2024-05-24',
    canonicalUrl: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2403347',
    contentHash: 'b9102938102938102938102938102938102938',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-TRIALS-FLOW-2024',
    title: 'FLOW Trial Registry (NCT03819153): Renal Outcomes with Once-Weekly Semaglutide in Type 2 Diabetes & CKD',
    issuer: 'CLINICALTRIALS_GOV',
    product: 'OZEMPIC',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection 1.0 mg',
    sourceType: 'TRIAL_REGISTRY',
    tier: 'TIER_2_CLINICAL_TRIAL',
    jurisdiction: 'GLOBAL',
    version: 'v2024.05',
    isCurrent: true,
    publicationDate: '2024-05-24',
    effectiveDate: '2024-05-24',
    canonicalUrl: 'https://clinicaltrials.gov/study/NCT03819153',
    contentHash: 'c8201928301928301928301928301928301928',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-ADA-STANDARDS-2024',
    title: 'ADA Standards of Care in Diabetes—2024: Pharmacologic Approaches to Glycemic Treatment & Obesity Management',
    issuer: 'NEJM',
    product: 'GENERAL_SEMAGLUTIDE',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous & Oral formulations',
    sourceType: 'GUIDELINE',
    tier: 'TIER_2_CLINICAL_TRIAL',
    jurisdiction: 'US',
    version: 'v2024.01',
    isCurrent: true,
    publicationDate: '2024-01-01',
    effectiveDate: '2024-01-01',
    canonicalUrl: 'https://diabetesjournals.org/care/issue/47/Supplement_1',
    contentHash: 'a1029381029381029381029381029381029381',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-FDA-SHORTAGE-SEMAGLUTIDE-2024',
    title: 'FDA Drug Shortage Database Notice: Semaglutide Injection Availability Status and Compounding Exemption Conditions',
    issuer: 'FDA_SAFETY',
    product: 'GENERAL_SEMAGLUTIDE',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection (Ozempic & Wegovy pre-filled pens)',
    sourceType: 'SAFETY_COMMUNICATION',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'US',
    version: 'v2024.06',
    isCurrent: true,
    publicationDate: '2024-06-05',
    effectiveDate: '2024-06-05',
    canonicalUrl: 'https://www.accessdata.fda.gov/scripts/drugshortages/dsp_DCAi.cfm?id=2',
    contentHash: 'd1029381029381029381029381029381029381',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-EMA-PRAC-SAFETY-2024',
    title: 'EMA PRAC Pharmacovigilance Signal Assessment: GLP-1 Receptor Agonists and Suicidal Ideation / Thyroid Cancer Review',
    issuer: 'EMA',
    product: 'GENERAL_SEMAGLUTIDE',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous & Oral GLP-1 RA formulations',
    sourceType: 'SAFETY_COMMUNICATION',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'EU',
    version: 'v2024.04',
    isCurrent: true,
    publicationDate: '2024-04-12',
    effectiveDate: '2024-04-12',
    canonicalUrl: 'https://www.ema.europa.eu/en/news/prac-concludes-assessment-glp-1-receptor-agonists',
    contentHash: 'e1029381029381029381029381029381029382',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-TRIALS-SOUL-2024',
    title: 'SOUL Trial Registry (NCT03914326): Cardiovascular Outcomes Study of Oral Semaglutide in T2D & CVD/CKD',
    issuer: 'CLINICALTRIALS_GOV',
    product: 'RYBELSUS',
    activeIngredient: 'semaglutide',
    formulation: 'Oral film-coated tablets 14 mg once daily',
    sourceType: 'TRIAL_REGISTRY',
    tier: 'TIER_2_CLINICAL_TRIAL',
    jurisdiction: 'GLOBAL',
    version: 'v2024.10',
    isCurrent: true,
    publicationDate: '2024-10-21',
    effectiveDate: '2024-10-21',
    canonicalUrl: 'https://clinicaltrials.gov/study/NCT03914326',
    contentHash: 'f8201928301928301928301928301928301929',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-JAMA-STEP2-2021',
    title: 'JAMA Article: Semaglutide 2.4 mg in Adults with Overweight or Obesity and Type 2 Diabetes (STEP 2 Trial)',
    issuer: 'NEJM',
    product: 'WEGOVY',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection 2.4 mg vs 1.0 mg',
    sourceType: 'PEER_REVIEWED_STUDY',
    tier: 'TIER_3_PEER_REVIEWED',
    jurisdiction: 'GLOBAL',
    version: 'v2021.03',
    isCurrent: true,
    publicationDate: '2021-03-13',
    effectiveDate: '2021-03-13',
    canonicalUrl: 'https://jamanetwork.com/journals/jama/fullarticle/2777025',
    contentHash: 'a7102938201928301928301928301928301930',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-NEJM-STEP4-2021',
    title: 'JAMA Article: Effect of Continued vs Discontinued Semaglutide 2.4 mg on Weight Loss Maintenance (STEP 4 Trial)',
    issuer: 'NEJM',
    product: 'WEGOVY',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection 2.4 mg once weekly',
    sourceType: 'PEER_REVIEWED_STUDY',
    tier: 'TIER_3_PEER_REVIEWED',
    jurisdiction: 'GLOBAL',
    version: 'v2021.03',
    isCurrent: true,
    publicationDate: '2021-03-23',
    effectiveDate: '2021-03-23',
    canonicalUrl: 'https://jamanetwork.com/journals/jama/fullarticle/2777886',
    contentHash: 'b7102938201928301928301928301928301931',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-NEJM-STEP5-2022',
    title: 'Nature Medicine Article: Two-Year Efficacy and Safety of Semaglutide 2.4 mg in Adults with Overweight/Obesity (STEP 5 Trial)',
    issuer: 'NEJM',
    product: 'WEGOVY',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection 2.4 mg once weekly',
    sourceType: 'PEER_REVIEWED_STUDY',
    tier: 'TIER_3_PEER_REVIEWED',
    jurisdiction: 'GLOBAL',
    version: 'v2022.10',
    isCurrent: true,
    publicationDate: '2022-10-04',
    effectiveDate: '2022-10-04',
    canonicalUrl: 'https://www.nature.com/articles/s41591-022-02026-4',
    contentHash: 'c7102938201928301928301928301928301932',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-FDA-WARNING-COUNTERFEIT-2023',
    title: 'FDA Safety Alert: Counterfeit Ozempic (semaglutide) 1 mg Injections Seized in U.S. Supply Chain',
    issuer: 'FDA_SAFETY',
    product: 'OZEMPIC',
    activeIngredient: 'semaglutide',
    formulation: 'Injectable 1 mg pens (Counterfeit lot NAR0074 / serial 430834149057)',
    sourceType: 'SAFETY_COMMUNICATION',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'US',
    version: 'v2023.12',
    isCurrent: true,
    publicationDate: '2023-12-21',
    effectiveDate: '2023-12-21',
    canonicalUrl: 'https://www.fda.gov/drugs/drug-safety-and-availability/fda-warns-consumers-and-healthcare-professionals-counterfeit-ozempic-semaglutide-1-mg-injection',
    contentHash: 'd7102938201928301928301928301928301933',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-FDA-OZEMPIC-2023-ILEUS-UPDATE',
    title: 'FDA Label Revision: Addition of Postmarketing Adverse Event Warning for Intestinal Obstruction (Ileus) to Ozempic Label',
    issuer: 'FDA',
    product: 'OZEMPIC',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection',
    sourceType: 'LABEL',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'US',
    version: 'v2023.09',
    isCurrent: true,
    publicationDate: '2023-09-22',
    effectiveDate: '2023-09-22',
    canonicalUrl: 'https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=209637',
    contentHash: 'e7102938201928301928301928301928301934',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-ESC-GUIDELINES-2023',
    title: '2023 ESC Guidelines for the Management of Cardiovascular Disease in Patients with Diabetes',
    issuer: 'EMA',
    product: 'GENERAL_SEMAGLUTIDE',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous & Oral GLP-1 RAs',
    sourceType: 'GUIDELINE',
    tier: 'TIER_2_CLINICAL_TRIAL',
    jurisdiction: 'EU',
    version: 'v2023.08',
    isCurrent: true,
    publicationDate: '2023-08-25',
    effectiveDate: '2023-08-25',
    canonicalUrl: 'https://academic.oup.com/eurheartj/article/44/39/4043/7238128',
    contentHash: 'f7102938201928301928301928301928301935',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-TRIALS-STEP-HFpEF-2023',
    title: 'STEP-HFpEF Trial Registry (NCT04788511): Semaglutide in Patients with Heart Failure with Preserved Ejection Fraction and Obesity',
    issuer: 'CLINICALTRIALS_GOV',
    product: 'WEGOVY',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection 2.4 mg once weekly',
    sourceType: 'TRIAL_REGISTRY',
    tier: 'TIER_2_CLINICAL_TRIAL',
    jurisdiction: 'GLOBAL',
    version: 'v2023.08',
    isCurrent: true,
    publicationDate: '2023-08-25',
    effectiveDate: '2023-08-25',
    canonicalUrl: 'https://clinicaltrials.gov/study/NCT04788511',
    contentHash: 'a8102938201928301928301928301928301936',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-NEJM-STEP-HFpEF-2023',
    title: 'NEJM Article: Semaglutide in Patients with Heart Failure with Preserved Ejection Fraction and Obesity (STEP-HFpEF)',
    issuer: 'NEJM',
    product: 'WEGOVY',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection 2.4 mg once weekly',
    sourceType: 'PEER_REVIEWED_STUDY',
    tier: 'TIER_3_PEER_REVIEWED',
    jurisdiction: 'GLOBAL',
    version: 'v2023.08',
    isCurrent: true,
    publicationDate: '2023-08-25',
    effectiveDate: '2023-08-25',
    canonicalUrl: 'https://www.nejm.org/doi/full/10.1056/NEJMoa2306963',
    contentHash: 'b8102938201928301928301928301928301937',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-ASA-FDA-PERIOPERATIVE-GLP1-2024',
    title: 'ASA / FDA Consensus Guidance: Perioperative Management of GLP-1 Receptor Agonists & Pulmonary Aspiration Prevention',
    issuer: 'FDA_SAFETY',
    product: 'GENERAL_SEMAGLUTIDE',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous & Oral GLP-1 RA formulations',
    sourceType: 'SAFETY_COMMUNICATION',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'US',
    version: 'v2024.03',
    isCurrent: true,
    publicationDate: '2024-03-15',
    effectiveDate: '2024-03-15',
    canonicalUrl: 'https://www.asahq.org/about-asa/newsroom/news-releases/2023/06/american-society-of-anesthesiologists-consensus-guidance-on-preoperative-management-of-patients-on-glp-1-receptor-agonists',
    contentHash: 'a9102938201928301928301928301928301938',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-EMA-PREGNANCY-LACTATION-2024',
    title: 'EMA SmPC Section 4.6 Safety Mandate: Pregnancy Discontinuation Window (2-Month Washout) & Contraception',
    issuer: 'EMA',
    product: 'GENERAL_SEMAGLUTIDE',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous & Oral semaglutide',
    sourceType: 'LABEL',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'EU',
    version: 'v2024.01',
    isCurrent: true,
    publicationDate: '2024-01-15',
    effectiveDate: '2024-01-15',
    canonicalUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/wegovy',
    contentHash: 'b9102938201928301928301928301928301939',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-FDA-AKINJURY-DEHYDRATION-2024',
    title: 'FDA Prescribing Warning: Acute Kidney Injury, Volume Depletion, and Gastrointestinal Reaction Escalation',
    issuer: 'FDA',
    product: 'OZEMPIC',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection',
    sourceType: 'LABEL',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'US',
    version: 'v2024.02',
    isCurrent: true,
    publicationDate: '2024-02-10',
    effectiveDate: '2024-02-10',
    canonicalUrl: 'https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=209637',
    contentHash: 'c9102938201928301928301928301928301940',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-FDA-HYPOGLYCEMIA-SULFONYLUREA-2024',
    title: 'FDA Prescribing Section 5.3: Increased Risk of Hypoglycemia with Concomitant Insulin Secretagogues or Insulin',
    issuer: 'FDA',
    product: 'OZEMPIC',
    activeIngredient: 'semaglutide',
    formulation: 'Subcutaneous injection',
    sourceType: 'LABEL',
    tier: 'TIER_1_REGULATORY',
    jurisdiction: 'US',
    version: 'v2024.01',
    isCurrent: true,
    publicationDate: '2024-01-08',
    effectiveDate: '2024-01-08',
    canonicalUrl: 'https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=209637',
    contentHash: 'd9102938201928301928301928301928301941',
    isActiveInCorpus: true
  },
  {
    id: 'DOC-TRIALS-PIONEER6-2019',
    title: 'PIONEER 6 Cardiovascular Trial (NCT02692716): Oral Semaglutide Safety & Outcomes in Type 2 Diabetes',
    issuer: 'CLINICALTRIALS_GOV',
    product: 'RYBELSUS',
    activeIngredient: 'semaglutide',
    formulation: 'Oral film-coated tablets 14 mg once daily',
    sourceType: 'TRIAL_REGISTRY',
    tier: 'TIER_2_CLINICAL_TRIAL',
    jurisdiction: 'GLOBAL',
    version: 'v2019.08',
    isCurrent: true,
    publicationDate: '2019-08-29',
    effectiveDate: '2019-08-29',
    canonicalUrl: 'https://clinicaltrials.gov/study/NCT02692716',
    contentHash: 'e9102938201928301928301928301928301942',
    isActiveInCorpus: true
  }
];

export const INITIAL_CHUNKS: DocumentChunk[] = [
  // --- FDA OZEMPIC 2024 CHUNKS ---
  {
    id: 'CHUNK-FDA-OZE-2024-BOXED-WARNING',
    docId: 'DOC-FDA-OZEMPIC-2024',
    sectionTitle: 'BOXED WARNING: RISK OF THYROID C-CELL TUMORS',
    pageLocator: 'Section 1, Page 1',
    content: `WARNING: RISK OF THYROID C-CELL TUMORS. In rodents, semaglutide causes dose-dependent and treatment-duration-dependent thyroid C-cell tumors at clinically relevant exposures. It is unknown whether OZEMPIC causes thyroid C-cell tumors, including medullary thyroid carcinoma (MTC), in humans as human relevance of rodent thyroid C-cell tumors has not been determined. OZEMPIC is contraindicated in patients with a personal or family history of MTC or in patients with Multiple Endocrine Neoplasia syndrome type 2 (MEN 2). Counsel patients regarding the potential risk for MTC with the use of OZEMPIC and inform them of symptoms of thyroid tumors (e.g., a mass in the neck, dysphagia, dyspnea, persistent hoarseness).`,
    summary: 'FDA Boxed Warning highlighting rodent thyroid C-cell tumor risk and contraindications in patients with personal/family history of MTC or MEN 2.',
    keywords: ['boxed warning', 'thyroid c-cell tumor', 'MTC', 'medullary thyroid carcinoma', 'MEN 2', 'rodent', 'neck mass', 'hoarseness', 'contraindication']
  },
  {
    id: 'CHUNK-FDA-OZE-2024-INDICATIONS',
    docId: 'DOC-FDA-OZEMPIC-2024',
    sectionTitle: '1 INDICATIONS AND USAGE',
    pageLocator: 'Section 1.1 - 1.2, Page 1-2',
    content: `OZEMPIC (semaglutide) injection is indicated: 
1. As an adjunct to diet and exercise to improve glycemic control in adults with type 2 diabetes mellitus.
2. To reduce the risk of major adverse cardiovascular events (cardiovascular death, non-fatal myocardial infarction, or non-fatal stroke) in adults with type 2 diabetes mellitus and established cardiovascular disease.
Limitations of Use: OZEMPIC is not indicated for use in patients with type 1 diabetes mellitus. OZEMPIC is not a substitute for insulin. OZEMPIC is not approved for weight loss or chronic weight management.`,
    summary: 'FDA approved indications for Ozempic: glycemic control in T2D and reduction of major adverse cardiovascular events (MACE) in adults with T2D and CVD.',
    keywords: ['indications', 'glycemic control', 'type 2 diabetes', 'cardiovascular risk reduction', 'MACE', 'myocardial infarction', 'stroke', 'not for weight loss', 'limitations']
  },
  {
    id: 'CHUNK-FDA-OZE-2024-WARNINGS-PANCREATITIS',
    docId: 'DOC-FDA-OZEMPIC-2024',
    sectionTitle: '5.1 WARNINGS AND PRECAUTIONS - Pancreatitis',
    pageLocator: 'Section 5.1, Page 3',
    content: `5.1 Acute Pancreatitis: In clinical trials, acute pancreatitis was reported in patients treated with OZEMPIC. After initiation of OZEMPIC, observe patients carefully for signs and symptoms of pancreatitis (including persistent severe abdominal pain, sometimes radiating to the back and which may or may not be accompanied by vomiting). If pancreatitis is suspected, OZEMPIC should promptly be discontinued and appropriate management should be initiated; if confirmed, OZEMPIC should not be restarted.`,
    summary: 'Warning on acute pancreatitis risk with Ozempic. Directs immediate discontinuation if severe abdominal pain occurs.',
    keywords: ['pancreatitis', 'acute pancreatitis', 'severe abdominal pain', 'vomiting', 'discontinue', 'warnings']
  },
  {
    id: 'CHUNK-FDA-OZE-2024-DOSAGE-ADMINISTRATION',
    docId: 'DOC-FDA-OZEMPIC-2024',
    sectionTitle: '2 DOSAGE AND ADMINISTRATION',
    pageLocator: 'Section 2.1 - 2.2, Page 2',
    content: `2.1 Recommended Dosage: Start OZEMPIC with a 0.25 mg subcutaneous injection once weekly for 4 weeks. The 0.25 mg dose is intended for treatment initiation and is not effective for glycemic control. After 4 weeks on the 0.25 mg dose, increase the dosage to 0.5 mg once weekly. If additional glycemic control is needed after at least 4 weeks on the 0.5 mg dose, the dosage may be increased to 1 mg once weekly. If additional glycemic control is needed after at least 4 weeks on the 1 mg dose, the dosage may be increased to 2 mg once weekly. Administer once weekly, on the same day each week, any time of day, with or without food.`,
    summary: 'Dosing regimen for Ozempic: initiate at 0.25 mg weekly for 4 weeks, step up to 0.5 mg, max titration up to 2 mg weekly.',
    keywords: ['dosage', 'administration', '0.25 mg', '0.5 mg', '1 mg', '2 mg', 'titration', 'subcutaneous', 'once weekly']
  },

  // --- SUPERSEDED FDA OZEMPIC 2021 CHUNK ---
  {
    id: 'CHUNK-FDA-OZE-2021-DOSAGE-SUPERSEDED',
    docId: 'DOC-FDA-OZEMPIC-2021-SUPERSEDED',
    sectionTitle: '2 DOSAGE AND ADMINISTRATION [SUPERSEDED]',
    pageLocator: 'Section 2.1, Page 2',
    content: `[SUPERSEDED - HISTORICAL REFERENCE ONLY] Start OZEMPIC with a 0.25 mg subcutaneous injection once weekly for 4 weeks. Increase to 0.5 mg weekly. Maximum approved dose in this 2021 label is 1 mg once weekly. (Note: The 2 mg weekly dose was not yet approved in the 2021 label version).`,
    summary: 'Historical 2021 FDA label where maximum approved dose was 1 mg weekly before the 2 mg dose approval in 2022.',
    keywords: ['superseded', '2021 label', '1 mg max dose', 'historical', 'obsolete']
  },

  // --- EMA OZEMPIC 2024 CHUNKS ---
  {
    id: 'CHUNK-EMA-OZE-2024-THERAPEUTIC-INDICATIONS',
    docId: 'DOC-EMA-OZEMPIC-2024',
    sectionTitle: '4.1 Therapeutic indications (EMA EU)',
    pageLocator: 'Section 4.1, Page 2',
    content: `Ozempic is indicated for the treatment of adults with insufficiently controlled type 2 diabetes mellitus as an adjunct to diet and exercise: 
- as monotherapy when metformin is considered inappropriate due to intolerance or contraindications 
- in addition to other medicinal products for the treatment of diabetes. 
For study results with respect to combinations, effects on glycaemic control and cardiovascular events, and the populations studied, see sections 4.4, 4.5 and 5.1.`,
    summary: 'EMA therapeutic indications in the EU: Type 2 diabetes monotherapy or add-on therapy. EU labeling handles cardiovascular data in SmPC section 5.1.',
    keywords: ['EMA', 'European Union', 'EU', 'SmPC', 'monotherapy', 'metformin', 'add-on therapy', 'type 2 diabetes']
  },
  {
    id: 'CHUNK-EMA-OZE-2024-DIABETIC-RETINOPATHY',
    docId: 'DOC-EMA-OZEMPIC-2024',
    sectionTitle: '4.4 Special warnings - Diabetic Retinopathy (EMA EU)',
    pageLocator: 'Section 4.4, Page 4',
    content: `Diabetic Retinopathy: In patients with diabetic retinopathy treated with insulin and semaglutide, an increased risk of developing diabetic retinopathy complications has been observed. Caution should be exercised when using semaglutide in patients with diabetic retinopathy treated with insulin. These patients should be monitored closely and treated according to clinical guidelines. Rapid improvement in glucose control has been associated with a temporary worsening of diabetic retinopathy.`,
    summary: 'EMA specific warning on diabetic retinopathy complications during rapid glucose control improvement when combined with insulin.',
    keywords: ['diabetic retinopathy', 'eye complications', 'insulin', 'EMA warning', 'European label', 'retinopathy']
  },

  // --- FDA WEGOVY 2024 CHUNKS ---
  {
    id: 'CHUNK-FDA-WEG-2024-INDICATIONS',
    docId: 'DOC-FDA-WEGOVY-2024',
    sectionTitle: '1 INDICATIONS AND USAGE (WEGOVY)',
    pageLocator: 'Section 1.1 - 1.2, Page 1',
    content: `WEGOVY (semaglutide) injection 2.4 mg is indicated:
1. In combination with a reduced calorie diet and increased physical activity to reduce excess body weight and maintain weight reduction long-term in adults and pediatric patients aged 12 years and older with an initial BMI of:
   - 30 kg/m2 or greater (obesity)
   - 27 kg/m2 or greater (overweight) in the presence of at least one weight-related comorbid condition (e.g., hypertension, type 2 diabetes, or dyslipidemia).
2. To reduce the risk of major adverse cardiovascular events (cardiovascular death, non-fatal myocardial infarction, or non-fatal stroke) in adults with established cardiovascular disease and either obesity or overweight.`,
    summary: 'FDA Wegovy indications: chronic weight management (BMI ≥30 or ≥27 with comorbidity) and CV risk reduction in overweight/obese adults with CVD.',
    keywords: ['Wegovy', 'weight loss', 'chronic weight management', 'obesity', 'overweight', 'BMI 30', 'BMI 27', 'cardiovascular risk reduction', 'SELECT trial']
  },
  {
    id: 'CHUNK-FDA-WEG-2024-TITRATION-SCHEDULE',
    docId: 'DOC-FDA-WEGOVY-2024',
    sectionTitle: '2.2 Recommended Dosage Schedule (WEGOVY)',
    pageLocator: 'Section 2.2, Page 2',
    content: `The recommended target dose of WEGOVY is 2.4 mg once weekly. Initiate dose escalation at 0.25 mg once weekly and follow a 16-week titration schedule to reach the maintenance dose:
- Weeks 1-4: 0.25 mg weekly
- Weeks 5-8: 0.5 mg weekly
- Weeks 9-12: 1 mg weekly
- Weeks 13-16: 1.7 mg weekly
- Maintenance (Week 17 and onward): 2.4 mg weekly.
If patients do not tolerate a dose step, consider delaying dose escalation for 4 weeks.`,
    summary: '16-week titration protocol for Wegovy starting at 0.25 mg up to 2.4 mg maintenance dose weekly.',
    keywords: ['Wegovy dosage', '2.4 mg', 'titration schedule', '0.25 mg', '0.5 mg', '1.7 mg', '16 weeks', 'escalation']
  },

  // --- FDA RYBELSUS 2024 CHUNKS ---
  {
    id: 'CHUNK-FDA-RYB-2024-ADMINISTRATION-INSTRUCTIONS',
    docId: 'DOC-FDA-RYBELSUS-2024',
    sectionTitle: '2.1 Important Administration Instructions (RYBELSUS)',
    pageLocator: 'Section 2.1, Page 1-2',
    content: `Instruct patients to take RYBELSUS at least 30 minutes before the first food, beverage, or other oral medications of the day with no more than 4 ounces of plain water only. Waiting less than 30 minutes, or taking with food/beverage/other meds, or with more than 4 ounces of water, will decrease the absorption and efficacy of semaglutide. Swallow tablets whole. Do not split, crush, or chew.`,
    summary: 'Oral semaglutide (Rybelsus) dosing rules: fasting state upon waking with max 4 oz plain water, wait ≥30 min before eating/drinking.',
    keywords: ['Rybelsus', 'oral semaglutide', '30 minutes', 'fasting', '4 ounces plain water', 'swallow whole', 'administration instructions']
  },

  // --- FDA SAFETY ALERT COMPOUNDING CHUNK ---
  {
    id: 'CHUNK-FDA-SAFETY-COMPOUNDING-2024',
    docId: 'DOC-FDA-SAFETY-COMPOUNDING-2024',
    sectionTitle: 'FDA Alert: Compounded Semaglutide Risks & Salt Formulations',
    pageLocator: 'Alert Document, Page 1',
    content: `FDA has received adverse event reports after patients used compounded semaglutide. FDA reminds compounding pharmacies and patients that compounded drugs are NOT FDA-approved or evaluated for safety and efficacy. In addition, FDA has expressed serious safety concerns regarding salt forms of semaglutide (such as semaglutide sodium and semaglutide acetate) used by some compounding pharmacies. These salt formulations have different active ingredients than the approved base semaglutide and have not been shown to be safe or effective. Patients should obtain semaglutide only with a valid prescription from state-licensed pharmacies using authentic FDA-approved base semaglutide.`,
    summary: 'FDA Safety Alert warning against unauthorized compounded semaglutide salt formulations (semaglutide sodium/acetate) and non-FDA approved sources.',
    keywords: ['compounded semaglutide', 'semaglutide sodium', 'semaglutide acetate', 'compounding pharmacy', 'FDA warning', 'unapproved', 'salts']
  },

  // --- CLINICAL TRIALS CHUNKS ---
  {
    id: 'CHUNK-TRIALS-SUSTAIN6-RESULTS',
    docId: 'DOC-TRIALS-SUSTAIN6',
    sectionTitle: 'SUSTAIN-6 Primary Cardiovascular Outcome Results',
    pageLocator: 'Results Summary, Page 3',
    content: `In the SUSTAIN-6 trial (NCT01720443) involving 3,297 patients with type 2 diabetes and high cardiovascular risk, subcutaneous semaglutide (0.5 mg or 1.0 mg once weekly) significantly reduced the risk of the primary composite outcome of CV death, nonfatal myocardial infarction, or nonfatal stroke by 26% compared with placebo (Hazard Ratio HR 0.74; 95% CI 0.58 to 0.95; p<0.001 for noninferiority, p=0.02 for superiority). Nonfatal stroke was reduced by 39% (HR 0.61; p=0.04) and nonfatal MI by 26% (HR 0.74; p=0.12).`,
    summary: 'SUSTAIN-6 trial primary results: 26% reduction in 3-point MACE with once-weekly semaglutide in T2D patients with high CV risk.',
    keywords: ['SUSTAIN-6', 'NCT01720443', '3-point MACE', 'hazard ratio 0.74', '26% reduction', 'stroke reduction', 'myocardial infarction']
  },
  {
    id: 'CHUNK-TRIALS-SELECT-RESULTS',
    docId: 'DOC-TRIALS-SELECT-2023',
    sectionTitle: 'SELECT Trial Primary Cardiovascular Results in Obesity Without Diabetes',
    pageLocator: 'Results Summary, Page 2',
    content: `In the SELECT landmark cardiovascular outcomes trial (NCT03574597) enrolling 17,604 adults with established cardiovascular disease and overweight/obesity WITHOUT diabetes, semaglutide 2.4 mg once weekly reduced the risk of 3-point MACE (CV death, nonfatal MI, nonfatal stroke) by 20% compared to placebo over a mean follow-up of 39.8 months (HR 0.80; 95% CI 0.72 to 0.90; p<0.001). This provided the clinical trial foundation for Wegovy FDA CV indication expansion in 2024.`,
    summary: 'SELECT trial key finding: 20% MACE reduction with Wegovy 2.4 mg in non-diabetic adults with overweight/obesity and established CVD.',
    keywords: ['SELECT trial', 'NCT03574597', '20% reduction', 'MACE', 'hazard ratio 0.80', 'obesity without diabetes', 'cardiovascular outcome trial']
  },

  // --- PEER REVIEWED NEJM STEP 1 CHUNK ---
  {
    id: 'CHUNK-NEJM-STEP1-RESULTS',
    docId: 'DOC-NEJM-STEP1-2021',
    sectionTitle: 'NEJM STEP 1 Trial Efficacy & Body Weight Loss Results',
    pageLocator: 'NEJM Vol 384, Page 989-1002',
    content: `In the double-blind STEP 1 trial of 1,961 adults with overweight or obesity without diabetes, participants receiving once-weekly semaglutide 2.4 mg plus lifestyle intervention achieved a mean body weight change of -14.9% from baseline at week 68, compared to -2.4% in the placebo group (estimated treatment difference -12.4 percentage points; p<0.001). 86.4% of participants in the semaglutide group achieved ≥5% weight loss, and 50.5% achieved ≥15% weight loss. Gastrointestinal events (nausea, diarrhea, vomiting, constipation) were the most frequent adverse events, mostly mild-to-moderate and transient.`,
    summary: 'STEP 1 NEJM publication: 14.9% average body weight loss at 68 weeks with semaglutide 2.4 mg; mild-to-moderate GI side effects predominant.',
    keywords: ['STEP 1', 'NEJM 2021', '14.9% weight loss', 'body weight change', 'nausea', 'diarrhea', 'gastrointestinal side effects', '68 weeks']
  },

  // --- NEW AUTHORITATIVE EVIDENCE CHUNKS ---
  {
    id: 'CHUNK-EMA-WEG-2024-INDICATIONS',
    docId: 'DOC-EMA-WEGOVY-2024',
    sectionTitle: '4.1 Therapeutic Indications (EMA Wegovy SmPC)',
    pageLocator: 'Section 4.1, Page 2',
    content: `Wegovy is indicated as an adjunct to a reduced-calorie diet and increased physical activity for weight management, including weight loss and weight maintenance, in adults with an initial Body Mass Index (BMI) of:
- ≥30 kg/m² (obesity), or
- ≥27 kg/m² to <30 kg/m² (overweight) in the presence of at least one weight-related comorbidity such as dysglycaemia (pre-diabetes or type 2 diabetes mellitus), hypertension, dyslipidaemia, obstructive sleep apnoea, or cardiovascular disease.
Adolescents (≥12 years): Wegovy is also indicated for weight management in adolescents aged 12 years and older with obesity and body weight above 60 kg.`,
    summary: 'EMA SmPC indications for Wegovy in the EU: adult weight management (BMI ≥30 or ≥27 with comorbidity) and adolescent weight management (≥12 years, obesity, >60 kg).',
    keywords: ['Wegovy EMA', 'European Union', 'SmPC', 'adolescents', '12 years', '60 kg', 'weight management', 'obesity', 'overweight', 'comorbidity']
  },
  {
    id: 'CHUNK-EMA-RYB-2024-ADMINISTRATION',
    docId: 'DOC-EMA-RYBELSUS-2024',
    sectionTitle: '4.2 Posology and method of administration (EMA Rybelsus)',
    pageLocator: 'Section 4.2, Page 2-3',
    content: `Rybelsus is a tablet for once-daily oral use. The tablet should be taken on an empty stomach at any time of the day. It should be swallowed whole with a sip of water (up to half a glass of water equivalent to 120 ml). Patients should wait at least 30 minutes before eating, drinking, or taking other oral medicinal products. Waiting less than 30 minutes decreases semaglutide absorption. If a dose is missed, the missed dose should be skipped and the next dose taken the following day.`,
    summary: 'European SmPC instructions for oral semaglutide (Rybelsus): take once daily on empty stomach with max 120 ml water and wait 30 minutes before food or drink.',
    keywords: ['Rybelsus EMA', 'oral semaglutide', '120 ml water', '30 minutes', 'empty stomach', 'skip missed dose', 'European SmPC']
  },
  {
    id: 'CHUNK-NEJM-FLOW-RESULTS',
    docId: 'DOC-NEJM-FLOW-2024',
    sectionTitle: 'FLOW Trial Primary Renal Outcome Results in Type 2 Diabetes & CKD',
    pageLocator: 'NEJM Vol 391, Page 109-121',
    content: `In the double-blind FLOW trial enrolling 3,533 participants with type 2 diabetes and chronic kidney disease (eGFR 50 to 75 with UACR >300 to <5000, or eGFR 25 to <50 with UACR >100 to <5000), once-weekly semaglutide 1.0 mg reduced the risk of the primary composite renal outcome (onset of kidney failure, persistent ≥50% reduction in eGFR from baseline, or death from kidney-related or cardiovascular causes) by 24% compared to placebo (Hazard Ratio HR 0.76; 95% CI 0.66 to 0.88; p=0.0003). Secondary endpoints showed a 18% reduction in major cardiovascular events (HR 0.82) and a 20% reduction in all-cause mortality (HR 0.80).`,
    summary: 'FLOW trial primary outcome: 24% reduction in major kidney failure events and 20% reduction in all-cause mortality in T2D patients with chronic kidney disease.',
    keywords: ['FLOW trial', 'chronic kidney disease', 'CKD', 'renal outcomes', '24% reduction', 'hazard ratio 0.76', 'kidney failure', 'eGFR', 'eGFR decline', 'uacr', 'all-cause mortality']
  },
  {
    id: 'CHUNK-TRIALS-FLOW-DESIGN',
    docId: 'DOC-TRIALS-FLOW-2024',
    sectionTitle: 'FLOW Clinical Trial Registry (NCT03819153) Protocol & Renal Endpoint Parameters',
    pageLocator: 'ClinicalTrials.gov Protocol Summary',
    content: `Trial NCT03819153 (FLOW): A randomized, double-blind, parallel-group, placebo-controlled trial evaluating the prevention of renal impairment progression with semaglutide 1.0 mg once weekly in subjects with type 2 diabetes and chronic kidney disease. Key secondary endpoints include annual rate of eGFR change (eGFR slope), 3-point MACE, and total mortality over a median follow-up of 3.4 years. The trial was stopped early for efficacy following an independent Data Monitoring Committee recommendation.`,
    summary: 'FLOW trial protocol parameters: evaluated semaglutide 1.0 mg weekly in 3,533 patients with T2D and CKD, stopped early due to significant renal benefit.',
    keywords: ['NCT03819153', 'FLOW protocol', 'eGFR slope', 'early trial termination', 'data monitoring committee', 'renal protection']
  },
  {
    id: 'CHUNK-ADA-2024-RECOMMENDATIONS',
    docId: 'DOC-ADA-STANDARDS-2024',
    sectionTitle: 'ADA 2024 Standards of Care: Cardiorenal & Weight Management Strategy',
    pageLocator: 'Section 10 & Section 8, Diabetes Care 2024',
    content: `For adults with type 2 diabetes and established ASCVD, high risk of ASCVD, heart failure, or chronic kidney disease (CKD), pharmacotherapy should include agents with demonstrated cardiorenal benefit. Semaglutide is recommended as a preferred GLP-1 receptor agonist with proven MACE risk reduction and renal disease progression slowing. In patients with type 2 diabetes where weight loss is a key treatment goal, high-efficacy weight loss agents such as semaglutide 2.4 mg or tirzepatide are recommended as first-line options to achieve ≥10-15% body weight reduction.`,
    summary: 'ADA 2024 Practice Guidelines strongly recommend semaglutide for cardiorenal protection (ASCVD and CKD) and high-efficacy weight management in diabetes care.',
    keywords: ['ADA 2024', 'Standards of Care', 'cardiorenal benefit', 'ASCVD', 'CKD', 'GLP-1 RA', 'weight loss goal', 'guidelines']
  },
  {
    id: 'CHUNK-FDA-SHORTAGE-RULES',
    docId: 'DOC-FDA-SHORTAGE-SEMAGLUTIDE-2024',
    sectionTitle: 'FDA Shortage Notice: Compounding Conditions & Section 503A/503B Limits',
    pageLocator: 'FDA Shortage Portal Notice',
    content: `When a drug is listed on the official FDA Drug Shortages Database, compounding pharmacies operating under Sections 503A and 503B of the Federal Food, Drug, and Cosmetic (FD&C) Act may produce compounded versions under specific statutory exemptions. However, the FDA clarifies that:
1. Compounded drugs are not FDA-approved, safety-tested, or quality-verified by the FDA.
2. Compounding must use USP/NF grade active pharmaceutical ingredients (API) in base form.
3. The use of salt forms (semaglutide sodium, semaglutide acetate) remains prohibited and unapproved because they are different chemical entities from approved base semaglutide.
4. Once a brand drug supply is no longer listed in shortage, compounding exemptions narrow significantly under federal law.`,
    summary: 'FDA Drug Shortage guidance clarifying 503A/503B compounding rules during supply shortages and strictly prohibiting semaglutide salt forms.',
    keywords: ['drug shortage', 'FDA shortage database', '503A', '503B', 'compounding exemptions', 'semaglutide sodium', 'API', 'FD&C Act']
  },
  {
    id: 'CHUNK-EMA-PRAC-SAFETY-FINDINGS',
    docId: 'DOC-EMA-PRAC-SAFETY-2024',
    sectionTitle: 'EMA PRAC Committee Assessment Outcome on GLP-1 RAs & Safety Signals',
    pageLocator: 'PRAC Public Meeting Summary, April 2024',
    content: `The Pharmacovigilance Risk Assessment Committee (PRAC) of the European Medicines Agency concluded its multi-month review of available evidence regarding GLP-1 receptor agonists (including semaglutide, liraglutide, dulaglutide). The PRAC concluded that available evidence does NOT support a causal association between GLP-1 receptor agonists and suicidal ideation, suicidal thoughts, or self-harm. In addition, the PRAC concluded that no update to product information regarding thyroid cancer risk is required beyond the existing warnings. Continuous signal detection remains active across European pharmacovigilance databases.`,
    summary: 'EMA PRAC safety review outcome: concluded no causal link between GLP-1 RAs (including semaglutide) and suicidal thoughts or self-harm.',
    keywords: ['EMA PRAC', 'pharmacovigilance', 'suicidal ideation', 'suicide risk', 'thyroid cancer signal', 'safety review', 'no causal link']
  },

  // --- ADDITIONAL CHUNKS FOR EXPANDED 25-DOC CORPUS ---
  {
    id: 'CHUNK-SOUL-TRIAL-DESIGN',
    docId: 'DOC-TRIALS-SOUL-2024',
    sectionTitle: 'SOUL Trial (NCT03914326) Primary Endpoint & Patient Population',
    pageLocator: 'ClinicalTrials.gov Protocol Summary',
    content: `The SOUL trial (NCT03914326) is a randomized, double-blind, parallel-group, placebo-controlled cardiovascular outcomes trial evaluating oral semaglutide (Rybelsus) 14 mg once daily in 9,650 individuals aged 50 years or older with type 2 diabetes and established cardiovascular disease (CVD) and/or chronic kidney disease (CKD). The primary outcome measure is time to first occurrence of 3-point MACE (cardiovascular death, non-fatal myocardial infarction, or non-fatal stroke).`,
    summary: 'SOUL trial protocol assessing oral semaglutide 14 mg daily for cardiovascular outcome reduction in 9,650 patients with T2D and CVD/CKD.',
    keywords: ['SOUL trial', 'oral semaglutide', 'Rybelsus', 'NCT03914326', 'MACE', 'cardiovascular outcome', '9650 patients']
  },
  {
    id: 'CHUNK-STEP2-JAMA-RESULTS',
    docId: 'DOC-JAMA-STEP2-2021',
    sectionTitle: 'JAMA STEP 2 Trial Results: Weight Loss in Type 2 Diabetes with Semaglutide 2.4 mg',
    pageLocator: 'JAMA Vol 325, Page 1414-1425',
    content: `In the STEP 2 trial involving 1,210 adults with overweight or obesity and type 2 diabetes, semaglutide 2.4 mg once weekly achieved a mean body weight loss of -9.6% at 68 weeks, compared to -7.0% with semaglutide 1.0 mg and -3.4% with placebo (p<0.001). 68.8% of patients in the 2.4 mg group achieved ≥5% weight loss. Mean HbA1c reduction was -1.6 percentage points with semaglutide 2.4 mg compared to -0.4 percentage points with placebo.`,
    summary: 'STEP 2 study demonstrating 9.6% body weight loss and 1.6% HbA1c reduction with semaglutide 2.4 mg in adults with T2D and obesity.',
    keywords: ['STEP 2', 'JAMA 2021', 'type 2 diabetes', '9.6% weight loss', 'HbA1c reduction', '2.4 mg vs 1.0 mg']
  },
  {
    id: 'CHUNK-STEP4-JAMA-RESULTS',
    docId: 'DOC-JAMA-STEP4-2021',
    sectionTitle: 'JAMA STEP 4 Trial Results: Effect of Treatment Withdrawal on Weight Regain',
    pageLocator: 'JAMA Vol 325, Page 1403-1413',
    content: `In the STEP 4 trial, 803 participants who completed a 20-week run-in period with semaglutide 2.4 mg (achieving a mean weight loss of -10.6%) were randomized to continue semaglutide 2.4 mg or switch to placebo for 48 weeks. Participants continuing semaglutide lost an additional -7.9% of body weight (total -17.4%), whereas those switched to placebo regained +6.9% of body weight. This trial established that continued treatment is required to maintain weight loss benefits.`,
    summary: 'STEP 4 trial confirming weight regain (+6.9%) upon switching to placebo vs additional weight loss (-7.9%) with continued semaglutide 2.4 mg.',
    keywords: ['STEP 4', 'weight maintenance', 'treatment withdrawal', 'weight regain', 'placebo switch', 'chronic therapy']
  },
  {
    id: 'CHUNK-STEP5-NATURE-RESULTS',
    docId: 'DOC-NEJM-STEP5-2022',
    sectionTitle: 'STEP 5 Two-Year Trial Efficacy & Weight Maintenance Results',
    pageLocator: 'Nature Medicine Vol 28, Page 2083-2091',
    content: `In the 104-week STEP 5 trial of 304 adults with overweight or obesity, once-weekly semaglutide 2.4 mg produced a mean body weight change of -15.2% from baseline at week 104 compared to -2.6% with placebo (estimated treatment difference -12.6 percentage points; p<0.001). Weight loss was sustained throughout the full 2-year duration. 77.1% of semaglutide participants achieved ≥5% weight loss at 2 years, confirming long-term durability.`,
    summary: 'STEP 5 2-year clinical study showing sustained 15.2% weight loss durability at 104 weeks with semaglutide 2.4 mg.',
    keywords: ['STEP 5', '2-year study', '104 weeks', '15.2% weight loss', 'durability', 'Nature Medicine 2022']
  },
  {
    id: 'CHUNK-FDA-COUNTERFEIT-ALERT',
    docId: 'DOC-FDA-WARNING-COUNTERFEIT-2023',
    sectionTitle: 'FDA Warning: Seizure of Counterfeit Ozempic 1 mg Injections in US Supply Chain',
    pageLocator: 'FDA Drug Safety Communication, Dec 2023',
    content: `The FDA warns healthcare professionals and consumers that counterfeit Ozempic (semaglutide) 1 mg injections have been identified and seized in the U.S. drug supply chain. Counterfeit units (specifically lot NAR0074 and serial number 430834149057) contained fake needles, fraudulent product labels, and compromised sterility. Patients reported adverse events including hypoglycemia and localized needle-site infections from counterfeit pens. FDA urges verification of supply chain integrity through licensed wholesalers.`,
    summary: 'FDA alert warning against counterfeit Ozempic 1 mg pens found in the US, detailing fake lot NAR0074 and safety hazards.',
    keywords: ['counterfeit Ozempic', 'fake pens', 'lot NAR0074', 'supply chain', 'FDA warning', 'hypoglycemia risk']
  },
  {
    id: 'CHUNK-FDA-OZEMPIC-ILEUS-WARNING',
    docId: 'DOC-FDA-OZEMPIC-2023-ILEUS-UPDATE',
    sectionTitle: 'FDA Label Update: Postmarketing Experience - Intestinal Obstruction / Ileus',
    pageLocator: 'Section 6.2 Postmarketing Experience, Page 14',
    content: `Section 6.2 (Postmarketing Experience) of the Ozempic prescribing information was updated to include Ileus (intestinal obstruction). Because these adverse reactions are reported voluntarily from a population of uncertain size, it is not always possible to reliably estimate their frequency or establish a causal relationship to drug exposure. Physicians should evaluate patients presenting with severe abdominal symptoms, constipation, or vomiting for potential gastrointestinal obstruction.`,
    summary: 'FDA label revision adding postmarketing warning for ileus (intestinal obstruction) to Ozempic Section 6.2.',
    keywords: ['ileus', 'intestinal obstruction', 'postmarketing', 'Section 6.2', 'Ozempic update', 'Gastrointestinal warning']
  },
  {
    id: 'CHUNK-ESC-GUIDELINES-2023',
    docId: 'DOC-ESC-GUIDELINES-2023',
    sectionTitle: '2023 ESC Guidelines: GLP-1 RAs in T2D with Cardiovascular Disease',
    pageLocator: 'Section 6.1, European Heart Journal 2023',
    content: `In the 2023 ESC Guidelines for CVD management in diabetes, GLP-1 receptor agonists with proven CV benefit (semaglutide, dulaglutide, liraglutide) are given a Class I, Level A recommendation to reduce cardiovascular events in patients with type 2 diabetes and established ASCVD or high/very high CV risk, independent of baseline HbA1c or concomitant metformin therapy.`,
    summary: 'ESC 2023 guidelines award Class I, Level A top recommendation to semaglutide for reducing MACE in T2D patients with ASCVD.',
    keywords: ['ESC guidelines', 'Class I Level A', 'ASCVD', 'cardiovascular disease', 'European Society of Cardiology']
  },
  {
    id: 'CHUNK-STEP-HFpEF-DESIGN',
    docId: 'DOC-TRIALS-STEP-HFpEF-2023',
    sectionTitle: 'STEP-HFpEF Trial Registry (NCT04788511) Endpoints & Inclusion Criteria',
    pageLocator: 'ClinicalTrials.gov Protocol Summary',
    content: `The STEP-HFpEF trial (NCT04788511) investigated semaglutide 2.4 mg once weekly in 529 patients with heart failure with preserved ejection fraction (EF ≥45%), BMI ≥30 kg/m2, and NYHA class II-IV symptoms. Dual primary endpoints were change from baseline in Kansas City Cardiomyopathy Questionnaire Clinical Summary Score (KCCQ-CSS) and percentage change in body weight at 52 weeks.`,
    summary: 'STEP-HFpEF trial protocol evaluating semaglutide 2.4 mg weekly for symptoms and weight in heart failure with preserved ejection fraction.',
    keywords: ['STEP-HFpEF', 'HFpEF', 'heart failure', 'KCCQ-CSS', 'NCT04788511', 'ejection fraction', 'preserved EF']
  },
  {
    id: 'CHUNK-STEP-HFpEF-NEJM-RESULTS',
    docId: 'DOC-NEJM-STEP-HFpEF-2023',
    sectionTitle: 'NEJM STEP-HFpEF Results: Heart Failure Symptoms & Exercise Capacity',
    pageLocator: 'NEJM Vol 389, Page 1069-1084',
    content: `In the STEP-HFpEF trial, semaglutide 2.4 mg once weekly produced a mean change in KCCQ-CSS score of 16.6 points vs 8.7 points for placebo (difference 7.8 points; p<0.001), indicating substantial improvement in heart failure symptoms, physical limitations, and exercise capacity (6-minute walk distance increase of +21.5 meters vs 1.2 meters for placebo; p<0.001). Mean body weight change was -13.3% vs -2.6% for placebo (p<0.001).`,
    summary: 'STEP-HFpEF trial published in NEJM showing 7.8 point KCCQ heart failure symptom score improvement and 13.3% weight loss with semaglutide 2.4 mg.',
    keywords: ['STEP-HFpEF NEJM', 'KCCQ score', 'heart failure symptoms', '6-minute walk distance', '13.3% weight loss', 'exercise capacity']
  },
  {
    id: 'CHUNK-ASA-PERIOPERATIVE-GLP1-ASPIRATION',
    docId: 'DOC-ASA-FDA-PERIOPERATIVE-GLP1-2024',
    sectionTitle: 'ASA Perioperative Guidance: Delayed Gastric Emptying & Pulmonary Aspiration Risk',
    pageLocator: 'ASA Practice Advisory Section 2, Page 1-3',
    content: `GLP-1 receptor agonists (including semaglutide) delay gastric emptying, which may cause residual gastric contents regardless of standard NPO (nothing by mouth) fasting times prior to elective surgery under anesthesia or deep sedation. This increases the risk of regurgitation and pulmonary aspiration. ASA guidelines recommend holding weekly GLP-1 RAs on the day of procedure if taken daily, or holding 1 week prior to elective procedure if taken weekly. If GLP-1 RAs are not held, evaluate for full stomach using ultrasound or treat as full stomach with rapid sequence induction.`,
    summary: 'ASA / FDA perioperative advisory recommending holding once-weekly semaglutide for 1 week prior to elective surgery due to delayed gastric emptying and aspiration risk.',
    keywords: ['perioperative', 'anesthesia', 'surgery', 'holding dose', 'delayed gastric emptying', 'pulmonary aspiration', 'NPO', 'fasting', 'ASA guidance']
  },
  {
    id: 'CHUNK-EMA-PREGNANCY-WASHOUT-2024',
    docId: 'DOC-EMA-PREGNANCY-LACTATION-2024',
    sectionTitle: 'EMA SmPC 4.6: Pregnancy, Lactation, and 2-Month Washout Window Requirement',
    pageLocator: 'SmPC Section 4.6, Page 5',
    content: `Pregnancy: Semaglutide should not be used during pregnancy. Animal studies have shown reproductive toxicity. If a patient wishes to become pregnant or pregnancy occurs, semaglutide must be discontinued. Due to the long half-life of semaglutide (~1 week), semaglutide MUST be discontinued at least 2 months before a planned pregnancy to allow adequate systemic clearance. Lactation: Semaglutide should not be used during breast-feeding as risk to the suckling child cannot be excluded.`,
    summary: 'EMA SmPC Section 4.6 mandate requiring semaglutide discontinuation at least 2 months prior to planned pregnancy due to long half-life and teratogenicity risk in animal studies.',
    keywords: ['pregnancy', '2 month washout', 'discontinue', 'planning pregnancy', 'lactation', 'breastfeeding', 'contraception', 'EMA SmPC 4.6']
  },
  {
    id: 'CHUNK-FDA-AKINJURY-VOLUMEDEPLETION',
    docId: 'DOC-FDA-AKINJURY-DEHYDRATION-2024',
    sectionTitle: 'FDA Warnings & Precautions Section 5.4: Acute Kidney Injury & Volume Depletion',
    pageLocator: 'Section 5.4, Page 6',
    content: `There have been postmarketing reports of acute kidney injury and worsening of chronic renal failure, which may sometimes require hemodialysis, in patients treated with semaglutide. Some of these events occurred in patients without known underlying renal disease. A majority of reported events occurred in patients who experienced nausea, vomiting, diarrhea, or dehydration. Monitoring renal function is recommended when initiating or escalating doses of semaglutide in patients reporting severe gastrointestinal adverse reactions.`,
    summary: 'FDA warning on acute kidney injury and volume depletion resulting from severe vomiting or diarrhea; recommends renal monitoring.',
    keywords: ['acute kidney injury', 'dehydration', 'renal failure', 'creatinine', 'vomiting', 'diarrhea', 'volume depletion', 'hemodialysis', 'FDA Section 5.4']
  },
  {
    id: 'CHUNK-FDA-HYPOGLYCEMIA-SULFONYLUREA',
    docId: 'DOC-FDA-HYPOGLYCEMIA-SULFONYLUREA-2024',
    sectionTitle: 'FDA Warnings & Precautions Section 5.3: Hypoglycemia with Concomitant Therapy',
    pageLocator: 'Section 5.3, Page 5',
    content: `Patients receiving semaglutide in combination with an insulin secretagogue (e.g., sulfonylurea such as glipizide, glimepiride) or insulin may have an increased risk of hypoglycemia, including severe hypoglycemia. The risk of hypoglycemia may be lowered by a reduction in the dose of the sulfonylurea (or other concomitantly administered insulin secretagogue) or insulin. Inform patients using these concomitantly of the risk of hypoglycemia and educate them on symptoms and management.`,
    summary: 'FDA Section 5.3 warning on elevated hypoglycemia risk when combining semaglutide with sulfonylureas or insulin; advises lowering background insulin/secretagogue dose.',
    keywords: ['hypoglycemia', 'low blood sugar', 'sulfonylurea', 'glipizide', 'glimepiride', 'insulin', 'concomitant therapy', 'dose reduction']
  },
  {
    id: 'CHUNK-TRIALS-PIONEER6-RESULTS',
    docId: 'DOC-TRIALS-PIONEER6-2019',
    sectionTitle: 'PIONEER 6 Primary CV Outcome Results for Oral Semaglutide (Rybelsus)',
    pageLocator: 'NEJM Vol 381, Page 841-851',
    content: `In the PIONEER 6 trial (NCT02692716) enrolling 3,183 patients with type 2 diabetes at high cardiovascular risk, oral semaglutide 14 mg once daily demonstrated noninferiority to placebo for 3-point MACE (HR 0.79; 95% CI 0.57 to 1.11; p<0.001 for noninferiority). Cardiovascular mortality was significantly reduced by 51% (HR 0.49; 95% CI 0.27 to 0.92) and all-cause mortality by 49% (HR 0.51; 95% CI 0.31 to 0.84) in the oral semaglutide group.`,
    summary: 'PIONEER 6 trial establishing CV safety for oral semaglutide (Rybelsus 14 mg) with significant reductions in CV death and all-cause mortality.',
    keywords: ['PIONEER 6', 'NCT02692716', 'oral semaglutide', 'Rybelsus', 'noninferiority', 'CV death reduction', '51% reduction']
  }
];

