/* Election data constants — compact dataset for demo (keeps repo < 1MB) */

export const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
  'Andaman & Nicobar', 'Dadra & Nagar Haveli', 'Lakshadweep'
];

export const CONSTITUENCIES = {
  'Uttar Pradesh': [
    { name: 'Varanasi', code: 'UP-53', mp: 'Narendra Modi', party: 'BJP', margin: 479505, turnout: 55.4, year: 2019 },
    { name: 'Lucknow', code: 'UP-17', mp: 'Rajnath Singh', party: 'BJP', margin: 347302, turnout: 53.2, year: 2019 },
    { name: 'Amethi', code: 'UP-36', mp: 'Smriti Irani', party: 'BJP', margin: 55120, turnout: 52.9, year: 2019 },
    { name: 'Rae Bareli', code: 'UP-35', mp: 'Sonia Gandhi', party: 'INC', margin: 167178, turnout: 53.4, year: 2019 },
    { name: 'Gorakhpur', code: 'UP-69', mp: 'Ravi Kishan', party: 'BJP', margin: 301664, turnout: 56.1, year: 2019 },
  ],
  'Maharashtra': [
    { name: 'Mumbai North', code: 'MH-26', mp: 'Gopal Shetty', party: 'BJP', margin: 465247, turnout: 50.6, year: 2019 },
    { name: 'Mumbai South', code: 'MH-30', mp: 'Arvind Sawant', party: 'Shiv Sena', margin: 100067, turnout: 50.1, year: 2019 },
    { name: 'Pune', code: 'MH-37', mp: 'Girish Bapat', party: 'BJP', margin: 400692, turnout: 49.3, year: 2019 },
    { name: 'Nagpur', code: 'MH-08', mp: 'Nitin Gadkari', party: 'BJP', margin: 216009, turnout: 56.8, year: 2019 },
  ],
  'Delhi': [
    { name: 'New Delhi', code: 'DL-01', mp: 'Meenakshi Lekhi', party: 'BJP', margin: 262644, turnout: 60.1, year: 2019 },
    { name: 'East Delhi', code: 'DL-05', mp: 'Gautam Gambhir', party: 'BJP', margin: 390157, turnout: 57.6, year: 2019 },
    { name: 'South Delhi', code: 'DL-04', mp: 'Ramesh Bidhuri', party: 'BJP', margin: 347302, turnout: 58.3, year: 2019 },
    { name: 'Chandni Chowk', code: 'DL-02', mp: 'Harsh Vardhan', party: 'BJP', margin: 229000, turnout: 61.0, year: 2019 },
    { name: 'North West Delhi', code: 'DL-06', mp: 'Hans Raj Hans', party: 'BJP', margin: 550922, turnout: 62.3, year: 2019 },
    { name: 'West Delhi', code: 'DL-03', mp: 'Parvesh Sahib Singh', party: 'BJP', margin: 566950, turnout: 61.5, year: 2019 },
    { name: 'North East Delhi', code: 'DL-07', mp: 'Manoj Tiwari', party: 'BJP', margin: 363625, turnout: 62.7, year: 2019 },
  ],
  'Tamil Nadu': [
    { name: 'Chennai South', code: 'TN-03', mp: 'Thamizhachi Thangapandian', party: 'DMK', margin: 268350, turnout: 58.1, year: 2019 },
    { name: 'Coimbatore', code: 'TN-20', mp: 'P.R. Natarajan', party: 'CPI(M)', margin: 47810, turnout: 67.5, year: 2019 },
    { name: 'Madurai', code: 'TN-30', mp: 'Su. Venkatesan', party: 'CPI(M)', margin: 138571, turnout: 65.2, year: 2019 },
  ],
  'Karnataka': [
    { name: 'Bangalore North', code: 'KA-23', mp: 'D.V. Sadananda Gowda', party: 'BJP', margin: 206543, turnout: 52.3, year: 2019 },
    { name: 'Bangalore South', code: 'KA-24', mp: 'Tejasvi Surya', party: 'BJP', margin: 331192, turnout: 53.6, year: 2019 },
    { name: 'Mysore', code: 'KA-21', mp: 'Pratap Simha', party: 'BJP', margin: 75752, turnout: 69.4, year: 2019 },
  ],
  'West Bengal': [
    { name: 'Kolkata North', code: 'WB-21', mp: 'Sudip Bandyopadhyay', party: 'TMC', margin: 127095, turnout: 67.1, year: 2019 },
    { name: 'Kolkata South', code: 'WB-22', mp: 'Mala Roy', party: 'TMC', margin: 113875, turnout: 65.8, year: 2019 },
    { name: 'Dum Dum', code: 'WB-20', mp: 'Saugata Roy', party: 'TMC', margin: 136926, turnout: 75.2, year: 2019 },
  ],
  'Gujarat': [
    { name: 'Ahmedabad East', code: 'GJ-10', mp: 'Hasmukhbhai Patel', party: 'BJP', margin: 497684, turnout: 57.8, year: 2019 },
    { name: 'Gandhinagar', code: 'GJ-02', mp: 'Amit Shah', party: 'BJP', margin: 557014, turnout: 63.8, year: 2019 },
    { name: 'Surat', code: 'GJ-21', mp: 'Darshana Jardosh', party: 'BJP', margin: 531481, turnout: 57.5, year: 2019 },
  ],
  'Rajasthan': [
    { name: 'Jaipur', code: 'RJ-13', mp: 'Ramcharan Bohra', party: 'BJP', margin: 389731, turnout: 60.7, year: 2019 },
    { name: 'Jodhpur', code: 'RJ-19', mp: 'Gajendra Singh Shekhawat', party: 'BJP', margin: 273609, turnout: 66.7, year: 2019 },
  ],
  'Kerala': [
    { name: 'Thiruvananthapuram', code: 'KL-20', mp: 'Shashi Tharoor', party: 'INC', margin: 99989, turnout: 73.5, year: 2019 },
    { name: 'Wayanad', code: 'KL-03', mp: 'Rahul Gandhi', party: 'INC', margin: 431770, turnout: 80.4, year: 2019 },
  ],
};

export const LOK_SABHA_2019 = {
  totalSeats: 543,
  results: [
    { party: 'BJP', seats: 303, votePct: 37.4, color: '#FF9933' },
    { party: 'INC', seats: 52, votePct: 19.5, color: '#19AAED' },
    { party: 'DMK', seats: 23, votePct: 2.3, color: '#FF0000' },
    { party: 'TMC', seats: 22, votePct: 4.1, color: '#228B22' },
    { party: 'YSRCP', seats: 22, votePct: 2.5, color: '#0066CC' },
    { party: 'Shiv Sena', seats: 18, votePct: 2.1, color: '#FF6600' },
    { party: 'JDU', seats: 16, votePct: 1.5, color: '#00A651' },
    { party: 'BJD', seats: 12, votePct: 1.7, color: '#006400' },
    { party: 'BSP', seats: 10, votePct: 3.6, color: '#006DF0' },
    { party: 'Others', seats: 65, votePct: 25.3, color: '#64748b' },
  ],
  voterTurnout: 67.4,
  totalVoters: 912000000,
  votesPolled: 614000000,
};

export const PARTY_COLORS = {
  'BJP': '#FF9933',
  'INC': '#19AAED',
  'AAP': '#0066CC',
  'SP': '#E60000',
  'BSP': '#006DF0',
  'TMC': '#228B22',
  'DMK': '#FF0000',
  'TDP': '#FFFF00',
  'JDU': '#00A651',
  'Shiv Sena': '#FF6600',
  'YSRCP': '#0066CC',
  'BJD': '#006400',
  'CPI(M)': '#FF0000',
  'NCP': '#004B87',
  'Others': '#64748b',
};

export const ELECTION_TIMELINE = [
  { date: 'Jan 2024', event: 'Model Code of Conduct study begins', desc: 'Parties prepare manifestos and candidate lists.', status: 'completed' },
  { date: 'Mar 16, 2024', event: 'Election dates announced', desc: 'Election Commission announces 7-phase polling schedule.', status: 'completed' },
  { date: 'Mar 16-Apr 18', event: 'Nomination period', desc: 'Candidates file nominations; scrutiny and withdrawals take place.', status: 'completed' },
  { date: 'Apr 19, 2024', event: 'Phase 1 Polling', desc: '102 constituencies across 21 states vote in the first phase.', status: 'completed' },
  { date: 'Apr-Jun 2024', event: 'Phases 2-7 Polling', desc: 'Remaining constituencies vote in subsequent phases over 6 weeks.', status: 'completed' },
  { date: 'Jun 4, 2024', event: 'Counting Day', desc: 'Votes counted and results declared constituency by constituency.', status: 'completed' },
  { date: 'Jun 9, 2024', event: 'Government Formation', desc: 'Winning party/alliance forms government; PM sworn in.', status: 'active' },
];

export const VOTING_GUIDE = {
  en: {
    steps: [
      { title: 'Check your name', desc: 'Visit voters.eci.gov.in or download the Voter Helpline app to verify your name on the electoral roll.' },
      { title: 'Locate your booth', desc: 'Your voter ID card (EPIC) has your polling station details. You can also find it online.' },
      { title: 'Carry valid ID', desc: 'Bring your voter ID card or any of the 12 accepted photo IDs (Aadhaar, PAN, Passport, etc.).' },
      { title: 'Arrive & queue', desc: 'Polling hours are typically 7 AM to 6 PM. Join the queue at your designated booth.' },
      { title: 'Verify & ink', desc: 'Show your ID, get indelible ink mark on your left index finger, sign the register.' },
      { title: 'Cast your vote', desc: 'Enter the booth alone, press the button next to your chosen candidate on the EVM. Verify on VVPAT.' },
    ],
    title: 'How to Vote — Step by Step',
  },
  hi: {
    steps: [
      { title: 'अपना नाम जांचें', desc: 'voters.eci.gov.in पर जाएं या वोटर हेल्पलाइन ऐप डाउनलोड करें।' },
      { title: 'अपना बूथ खोजें', desc: 'आपके वोटर आईडी कार्ड (EPIC) पर मतदान केंद्र का विवरण है।' },
      { title: 'वैध आईडी लाएं', desc: 'वोटर आईडी कार्ड या 12 स्वीकृत फोटो आईडी में से कोई एक लाएं।' },
      { title: 'पहुंचें और कतार में लगें', desc: 'मतदान का समय आमतौर पर सुबह 7 बजे से शाम 6 बजे तक होता है।' },
      { title: 'सत्यापन और स्याही', desc: 'आईडी दिखाएं, बाएं तर्जनी पर स्याही लगवाएं, रजिस्टर पर हस्ताक्षर करें।' },
      { title: 'अपना वोट डालें', desc: 'अकेले बूथ में जाएं, ईवीएम पर अपने उम्मीदवार के बगल वाला बटन दबाएं। VVPAT से सत्यापित करें।' },
    ],
    title: 'वोट कैसे करें — चरण दर चरण',
  },
};
