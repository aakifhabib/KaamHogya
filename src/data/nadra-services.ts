/** Nationwide research summaries, not a claim of availability at every individual counter.
 * Checked against the linked NADRA pages on 16 November 2026. */
export const NADRA_REVIEWED = '2026-11-16T00:00:00Z';
export const NADRA_FEES = 'https://www.nadra.gov.pk/feeStructure';
export const NADRA_SUPPORT = 'https://www.nadra.gov.pk/customer-support';

export interface NadraService {
  slug: string;
  category: string;
  title: string;
  summary: string;
  eligibility: string;
  documents: string[];
  steps: string[];
  fees: string;
  caution: string;
  sources: { label: string; url: string }[];
}

export const NADRA_SERVICES: NadraService[] = [
  {
    slug: 'first-cnic', category: 'Adult identity', title: 'First CNIC',
    summary: 'First-time identity registration for Pakistani citizens aged 18 or over.',
    eligibility: 'Pakistani citizens aged 18 or over, including existing CRC or Juvenile Card holders.',
    documents: ['A verified computerised birth certificate from the Union Council, municipal committee or cantonment, or a citizenship / naturalisation certificate.', 'Parent or blood relative’s ID number; NADRA also describes an alternative witness and undertaking for certain cases without a blood relative.', 'Parent or blood relative biometric verification, or attestation as permitted by NADRA regulations.'],
    steps: ['Check the current requirements and your particular circumstances with NADRA.', 'Apply at a registration centre or check whether your case is eligible on the official PakID app.', 'Complete the identity checks and biometrics required for your application; track its status with NADRA.'],
    fees: 'NADRA lists a new ordinary CNIC at Rs. 0 normal, Rs. 1,150 urgent and Rs. 2,150 executive; a new Smart NIC is Rs. 750 / 1,500 / 2,500.',
    caution: 'The required proof and verification can differ by case. The official CNIC page notes that a centre visit may be required for biometrics or photography.',
    sources: [{ label: 'NADRA: CNIC', url: 'https://www.nadra.gov.pk/identityDocument/cnic?tab=nic&action=new' }, { label: 'NADRA fee structure', url: NADRA_FEES }],
  },
  {
    slug: 'cnic-renewal', category: 'Adult identity', title: 'Renew an existing CNIC',
    summary: 'Renew an expired identity card through NADRA or check eligibility for PakID.',
    eligibility: 'Existing CNIC holders seeking renewal; conditions depend on the application and record.',
    documents: ['Have your existing identity details available. Ask NADRA what additional evidence or biometric checks apply to your case.'],
    steps: ['Choose renewal and the appropriate card type and priority.', 'Apply through an appropriate NADRA centre or, if eligible, the official PakID app.', 'Pay the applicable charge and track the application with NADRA.'],
    fees: 'NADRA lists ordinary CNIC renewal at Rs. 400 / 1,150 / 2,150 and Smart NIC renewal at Rs. 750 / 1,500 / 2,500 for normal / urgent / executive.',
    caution: 'NADRA’s fee page displays conflicting Smart NIC timeline rows. Confirm the current timeline and any delivery charges before paying.',
    sources: [{ label: 'NADRA: CNIC', url: 'https://www.nadra.gov.pk/identityDocument/cnic' }, { label: 'NADRA fee structure', url: NADRA_FEES }, { label: 'NADRA: PakID', url: 'https://www.nadra.gov.pk/aboutPakID' }],
  },
  {
    slug: 'cnic-modification', category: 'Adult identity', title: 'Change CNIC details',
    summary: 'Request a change or correction to identity information, including family-related details.',
    eligibility: 'Existing identity document holders; the evidence and permissions depend on the field being changed.',
    documents: ['Gather documentary proof relevant to the field to be changed and your existing identity details. NADRA’s registration policy sets out case-specific requirements.'],
    steps: ['Identify the field and check the relevant NADRA policy.', 'Choose modification at a centre or check eligibility in PakID.', 'Provide the requested evidence and complete any verification required.'],
    fees: 'NADRA lists ordinary CNIC modification at Rs. 400 / 1,150 / 2,150 and Smart NIC modification at Rs. 750 / 1,500 / 2,500 (normal / urgent / executive). Non-printable field updates have a separate schedule.',
    caution: 'Not every update requires a new card, and restrictions and evidence vary by field. Confirm the correct service and fee with NADRA.',
    sources: [{ label: 'NADRA: CNIC', url: 'https://www.nadra.gov.pk/identityDocument/cnic' }, { label: 'NADRA registration policy', url: 'https://www.nadra.gov.pk/assests/downloadsPdf/registration-policy-6-0-2-english.pdf' }, { label: 'NADRA fee structure', url: NADRA_FEES }],
  },
  {
    slug: 'lost-cnic', category: 'Adult identity', title: 'Replace a lost CNIC',
    summary: 'Request a duplicate or reprint when an existing card is lost.',
    eligibility: 'Existing CNIC holders who need a duplicate; confirm the required checks with NADRA.',
    documents: ['Keep your identity details available and check with NADRA for evidence and verification required for your case.'],
    steps: ['Select reprint / lost at a NADRA centre or check eligibility in PakID.', 'Complete the required identity verification and pay the applicable fee.', 'Track your request with NADRA.'],
    fees: 'NADRA lists duplicate ordinary CNIC fees of Rs. 400 / 1,150 / 2,150 and Smart NIC duplicate fees of Rs. 750 / 1,500 / 2,500 (normal / urgent / executive).',
    caution: 'The official fee page contains conflicting duplicate Smart NIC timeline rows; confirm before applying.',
    sources: [{ label: 'NADRA: CNIC', url: 'https://www.nadra.gov.pk/identityDocument/cnic' }, { label: 'NADRA fee structure', url: NADRA_FEES }, { label: 'NADRA: PakID', url: 'https://www.nadra.gov.pk/aboutPakID' }],
  },
  {
    slug: 'child-registration', category: 'Children & family', title: 'Child Registration Certificate & Juvenile Card',
    summary: 'Register a Pakistani child under 18 with NADRA; CRC is distinct from birth registration.',
    eligibility: 'Pakistani citizens under 18 are eligible for a CRC or Juvenile Card under NADRA’s published guidance.',
    documents: ['For inland births, a computerised birth registration certificate issued by the Union Council, municipal committee or cantonment; for births abroad, a detailed birth certificate or S-1 form.', 'NADRA says children above age 3 must be present for CRC, and children must be present for Juvenile Card applications. For CRC up to age 3, NADRA notes presence when processed for passport issuance. Confirm the age-three boundary with NADRA.'],
    steps: ['Obtain the appropriate birth registration document first.', 'Check which identity document and biometric requirements apply to the child’s age.', 'Apply at a centre or check PakID availability for the specific application.'],
    fees: 'NADRA lists CRC normal Rs. 50 (7 days) and executive Rs. 500 (1 day). Check NADRA for Juvenile Card fees and current processing.',
    caution: 'NADRA lists CRC biometrics as no biometrics up to age 3, photograph and iris from 3 to 10, and photograph, fingerprints and iris from 10 to 18. A photograph is required on CRC for passport processing.',
    sources: [{ label: 'NADRA: CRC / Juvenile Card', url: 'https://www.nadra.gov.pk/identityDocument/juvenile?action=new' }, { label: 'NADRA fee structure', url: NADRA_FEES }],
  },
  {
    slug: 'family-registration-certificate', category: 'Children & family', title: 'Family Registration Certificate (FRC)',
    summary: 'Get a certificate showing family composition recorded with NADRA.',
    eligibility: 'NADRA generally requires family members to be registered with valid 13-digit identification numbers; its guidance describes exceptions for certain unregistered people.',
    documents: ['The applicant’s 13-digit CRC, Juvenile Card, CNIC, NICOP or POC number. Ask NADRA about additional evidence if family records need correction.'],
    steps: ['Review the family composition in NADRA’s records.', 'Apply for the applicable family category at NADRA or check the official PakID app.', 'If a record is missing or incorrect, ask NADRA how to update it before relying on the certificate.'],
    fees: 'NADRA lists Rs. 1,000 for Alpha / Beta / Gama family and Rs. 2,000 for both, with a one-day executive timeline.',
    caution: 'An FRC reflects NADRA family records; it is not itself a birth or marriage registration certificate.',
    sources: [{ label: 'NADRA: FRC', url: 'https://www.nadra.gov.pk/identityDocument/certificates/frc?tab=frc' }, { label: 'NADRA fee structure', url: NADRA_FEES }],
  },
  {
    slug: 'nicop', category: 'Overseas & origin', title: 'NICOP for overseas Pakistanis',
    summary: 'Identity registration for eligible Pakistani citizens residing or intending to reside abroad.',
    eligibility: 'NADRA describes eligibility for Pakistani citizens living or working abroad, certain dual nationals, those intending extended stays abroad and eligible children born abroad.',
    documents: ['Birth or citizenship evidence differs for inland and overseas applicants; NADRA lists a verified local birth certificate or foreign detailed birth certificate / S-1, as applicable.', 'Travel, residence and family-verification evidence may be required depending on the case; consult the official NICOP page.'],
    steps: ['Check eligibility and the appropriate supporting documents for your residence and circumstances.', 'Apply through PakID or consult a NADRA centre or overseas mission.', 'Complete the requested verification, pay the appropriate zone-based fee and track the request.'],
    fees: 'NADRA publishes separate USD fee zones. Its page contains contradictory duplicate entries for Zone B duplicate executive NICOP; verify the actual charge with NADRA before payment.',
    caution: 'NICOP is for eligible Pakistani citizens. A POC is a different document for eligible foreign nationals of Pakistani origin.',
    sources: [{ label: 'NADRA: NICOP', url: 'https://www.nadra.gov.pk/identityDocument/nicop?action=new' }, { label: 'NADRA fee structure', url: NADRA_FEES }],
  },
  {
    slug: 'pakistan-origin-card', category: 'Overseas & origin', title: 'Pakistan Origin Card (POC)',
    summary: 'Identity card for eligible foreign nationals with a qualifying connection to Pakistan.',
    eligibility: 'NADRA lists former Pakistani citizens, certain foreign nationals with Pakistani parents or grandparents and qualifying foreign spouses among possible applicants. Nationality restrictions and other conditions apply.',
    documents: ['Required evidence depends on the eligibility route. NADRA directs applicants to its POC registration policy; confirm the proof required for your circumstances.'],
    steps: ['Check NADRA’s complete eligibility restrictions and registration policy.', 'Check PakID or contact NADRA about applying and required proof.', 'Complete the required verification and track the application with NADRA.'],
    fees: 'NADRA lists new Smart POC as USD 150 / 200 / 250 for normal / urgent / executive; modification and duplicate have different fees.',
    caution: 'POC eligibility is not equivalent to Pakistani citizenship. Confirm current conditions and fees with NADRA.',
    sources: [{ label: 'NADRA: POC', url: 'https://www.nadra.gov.pk/identityDocument/poc?action=new' }, { label: 'NADRA fee structure', url: NADRA_FEES }, { label: 'NADRA registration policy', url: 'https://www.nadra.gov.pk/assests/downloadsPdf/registration-policy-6-0-2-english.pdf' }],
  },
  {
    slug: 'identity-cancellation', category: 'Family & succession', title: 'Identity document cancellation',
    summary: 'Cancellation of a registration or identity document, including after death.',
    eligibility: 'NADRA identifies death, nationality surrender and other specific circumstances as reasons for cancellation.',
    documents: ['Requirements depend on the reason for cancellation. NADRA directs applicants to the cancellation chapter in its registration policy.'],
    steps: ['Identify the correct cancellation reason and check the relevant policy.', 'Contact NADRA to confirm who may apply and what evidence is needed.', 'Apply through the appropriate channel and retain the cancellation certificate if issued.'],
    fees: 'NADRA lists CNIC / CRC cancellation due to death as free with a one-day timeline. Fees for other documents or reasons may differ.',
    caution: 'Do not assume that all cancellation types have the same requirements or charges.',
    sources: [{ label: 'NADRA: cancellation', url: 'https://www.nadra.gov.pk/identityDocument/certificates/cancellation?tab=cancellation' }, { label: 'NADRA fee structure', url: NADRA_FEES }, { label: 'NADRA registration policy', url: 'https://www.nadra.gov.pk/assests/downloadsPdf/registration-policy-6-0-2-english.pdf' }],
  },
  {
    slug: 'succession-certificate', category: 'Family & succession', title: 'Succession Certificate & Letter of Administration',
    summary: 'NADRA’s published route for eligible legal heirs dealing with a deceased person’s assets.',
    eligibility: 'NADRA states that the deceased and legal heirs must be Pakistani citizens and assets must be in Pakistan. Consult NADRA on the applicable legal route and designated sites.',
    documents: ['Death certificate and NADRA CNIC cancellation certificate.', 'Family Registration Certificate and list of legal heirs with CNIC copies.', 'Details of movable and immovable assets, plus a letter of authorisation / affidavit attested by an oath commissioner.'],
    steps: ['Collect the required documents and confirm the designated site and applicable procedure.', 'One legal heir applies in person as directed by NADRA; its page specifies application through legal counsel in Sindh and Balochistan.', 'Complete the process and publication / verification requirements as directed.'],
    fees: 'NADRA lists Rs. 10,000 for assets below Rs. 100,000 and Rs. 20,000 for assets of Rs. 100,000 or more, plus Rs. 2,000 where applicable; it lists 14 days after publication.',
    caution: 'A succession certificate concerns movable assets and a letter of administration immovable property. Legal requirements and disputes can affect the route and timeline.',
    sources: [{ label: 'NADRA: succession', url: 'https://www.nadra.gov.pk/identityDocument/certificates/succession?tab=succession' }, { label: 'NADRA fee structure', url: NADRA_FEES }],
  },
];
