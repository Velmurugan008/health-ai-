/**
 * HealthAI - Medical Knowledge Base
 * Curated educational dataset covering 11 core health & wellness categories.
 * 
 * IMPORTANT: Strictly designed for general health awareness and education.
 * Does NOT diagnose diseases or prescribe pharmaceutical treatments.
 */

const HEALTH_KNOWLEDGE_BASE = [
  {
    id: "common_cold",
    category: "Respiratory & Viral Illness",
    title: "Common Cold",
    keywords: ["cold", "runny nose", "sneezing", "nasal congestion", "blocked nose", "sore throat", "mild cold", "stuffy nose"],
    overview: "The common cold is a mild, self-limiting viral infection primarily affecting the upper respiratory tract (nose and throat). Most colds resolve on their own within 7 to 10 days.",
    symptoms: [
      "Stuffy, congested, or runny nose",
      "Scratchy or mild sore throat",
      "Frequent sneezing and watery eyes",
      "Mild cough and general fatigue",
      "Low-grade fever (more common in children)"
    ],
    selfCare: [
      "Prioritize rest and allow your body ample time to recuperate.",
      "Stay well-hydrated with warm fluids like clear broths, herbal teas, or warm water with honey.",
      "Use saline nasal sprays or gentle steam inhalation to soothe congested nasal passages.",
      "Gargle warm salt water (1/2 teaspoon salt in warm water) to relieve throat irritation."
    ],
    whenToConsult: [
      "Symptoms persist longer than 10 to 14 days without improvement.",
      "Development of a high fever (>102°F / 38.9°C) or sudden worsening after temporary recovery.",
      "Severe sinus pain, earache, or difficulty breathing."
    ],
    reminder: "Antibiotics are ineffective against colds because colds are caused by viruses, not bacteria."
  },
  {
    id: "fever",
    category: "General Symptoms",
    title: "Fever Management",
    keywords: ["fever", "temperature", "high temp", "chills", "feeling hot", "shivering", "febrile"],
    overview: "A fever is a temporary increase in body temperature, typically above 100.4°F (38.0°C). It is often a natural biological response as the immune system fights off an infection.",
    symptoms: [
      "Elevated body temperature above 100.4°F (38°C)",
      "Shivering, chills, and goosebumps",
      "Sweating as the fever breaks",
      "Headache, muscle aches, and loss of appetite",
      "General lethargy or weakness"
    ],
    selfCare: [
      "Drink plenty of fluids (water, oral rehydration solutions, diluted fruit juices) to prevent dehydration.",
      "Dress in light, breathable clothing and keep the room temperature comfortable.",
      "Rest adequately and avoid strenuous physical exertion.",
      "Apply a lukewarm (not cold) damp sponge or compress to the forehead if uncomfortable."
    ],
    whenToConsult: [
      "Fever in infants under 3 months (requires immediate emergency medical evaluation).",
      "Temperature exceeds 103°F (39.4°C) in adults or lasts longer than 3 consecutive days.",
      "Accompanied by stiff neck, confusion, difficulty breathing, rash, or persistent vomiting."
    ],
    reminder: "Do not give aspirin to children or teenagers due to the risk of Reye's syndrome."
  },
  {
    id: "headache",
    category: "Neurological & Pain",
    title: "Tension & Mild Headaches",
    keywords: ["headache", "head pain", "throbbing head", "migraine", "temple pain", "tension headache"],
    overview: "Most common headaches are tension headaches caused by muscle contractions in the neck, scalp, or eye strain, frequently triggered by stress, dehydration, or lack of sleep.",
    symptoms: [
      "Dull, aching head pain often felt like a tight band around the forehead",
      "Tenderness across the scalp, neck, and shoulder muscles",
      "Mild sensitivity to bright lights or loud noises",
      "Pressure behind the eyes after prolonged screen use"
    ],
    selfCare: [
      "Rest in a quiet, dark, well-ventilated room with eyes closed.",
      "Drink a large glass of water, as mild dehydration is a frequent headache trigger.",
      "Apply a warm or cool compress to the forehead or the back of your neck.",
      "Practice gentle neck stretches and deep breathing to release muscle tension.",
      "Take structured breaks from computers, tablets, and smartphone screens (20-20-20 rule)."
    ],
    whenToConsult: [
      "Sudden, extremely severe headache ('thunderclap' headache) with no prior history.",
      "Headache following a recent head injury, blow, or fall.",
      "Accompanied by confusion, slurred speech, one-sided weakness, vision loss, or high fever."
    ],
    reminder: "Frequent recurrent headaches should be evaluated by a healthcare specialist."
  },
  {
    id: "cough",
    category: "Respiratory",
    title: "Cough Care",
    keywords: ["cough", "coughing", "dry cough", "wet cough", "phlegm", "mucus", "chest congestion"],
    overview: "Coughing is a natural defensive reflex that helps clear irritants, dust, and excess mucus from your airways and lungs. It can be dry (tickly) or productive (producing phlegm).",
    symptoms: [
      "Dry, scratchy throat cough",
      "Chest congestion or phlegm production",
      "Postnasal drip sensation",
      "Throat irritation exacerbated by speaking or cold air"
    ],
    selfCare: [
      "Sip warm water, herbal teas, or warm lemon water with a spoonful of honey (for individuals over 1 year old).",
      "Use a cool-mist humidifier in your living or sleeping area to moisten air passages.",
      "Avoid smoke, perfumes, aerosol sprays, and harsh chemical fumes.",
      "Elevate your head with an extra pillow when lying down to reduce night-time coughing."
    ],
    whenToConsult: [
      "Coughing up blood or thick rust-colored/foul-smelling sputum.",
      "Shortness of breath, wheezing, or audible whistling when breathing.",
      "Unexplained chest pain while breathing or coughing.",
      "Cough lasting longer than 3 to 4 weeks."
    ],
    reminder: "Honey is safe for adults and children older than 1 year, but must NEVER be given to infants under 12 months."
  },
  {
    id: "dehydration",
    category: "Fluids & Hydration",
    title: "Dehydration & Fluid Balance",
    keywords: ["dehydration", "dehydrated", "thirst", "dry mouth", "dark urine", "water intake", "electrolyte"],
    overview: "Dehydration occurs when your body loses more fluids and electrolytes than you take in, impairing normal physiological functions. It often stems from excessive sweating, hot weather, diarrhea, or low fluid intake.",
    symptoms: [
      "Intense thirst and sticky, dry mouth",
      "Dark amber or concentrated urine with reduced urination frequency",
      "Dizziness, lightheadedness, or slight confusion when standing up",
      "Fatigue, sunken eyes, and dry or cool skin"
    ],
    selfCare: [
      "Sip small amounts of clean water or Oral Rehydration Salts (ORS) solution continuously.",
      "Consume electrolyte-rich fluids like coconut water, diluted fruit juices, or clear broths.",
      "Rest in a cool, shaded environment to minimize continued perspiration.",
      "Avoid caffeinated sodas, energy drinks, and alcohol which can worsen fluid loss."
    ],
    whenToConsult: [
      "Inability to keep liquids down for more than 12-24 hours due to vomiting.",
      "Extreme lethargy, fainting, disorientation, or rapid heart rate.",
      "Absence of urination for 8 hours or more in adults."
    ],
    reminder: "Prevent dehydration during hot weather or exercise by drinking fluids before feeling thirsty."
  },
  {
    id: "sleep",
    category: "Lifestyle & Sleep Hygiene",
    title: "Sleep Hygiene & Rest",
    keywords: ["sleep", "insomnia", "sleeplessness", "cant sleep", "tired", "sleep quality", "bedtime", "rest"],
    overview: "Quality sleep (7 to 9 hours for most adults) is foundational for immune defense, cognitive clarity, hormonal balance, and cellular repair.",
    symptoms: [
      "Difficulty falling asleep within 30 minutes of getting into bed",
      "Frequent night-time awakenings or early morning awakenings",
      "Waking up feeling unrefreshed, groggy, or fatigued during the day",
      "Daytime irritability, brain fog, and reduced focus"
    ],
    selfCare: [
      "Maintain a consistent sleep and wake schedule, including weekends.",
      "Turn off screens (phones, TVs, laptops) at least 60 minutes before bedtime to prevent blue light from suppressing melatonin.",
      "Keep the bedroom dark, quiet, and comfortably cool (around 65-68°F / 18-20°C).",
      "Avoid heavy meals, caffeine, and alcohol within 4-6 hours of sleeping.",
      "Incorporate winding-down rituals: reading a physical book, light stretching, or meditation."
    ],
    whenToConsult: [
      "Chronic insomnia lasting more than a month impacting daily functionality.",
      "Loud chronic snoring, gasping, or pauses in breathing observed during sleep (potential sleep apnea).",
      "Severe restless leg sensations disrupting rest."
    ],
    reminder: "Avoid relying on over-the-counter sleep sedatives without medical supervision."
  },
  {
    id: "exercise",
    category: "Physical Fitness & Activity",
    title: "Physical Activity & Fitness",
    keywords: ["exercise", "workout", "fitness", "physical activity", "walking", "gym", "cardio", "sedentary"],
    overview: "Regular physical activity supports cardiovascular health, strengthens musculoskeletal integrity, boosts mental health, and assists in metabolic regulation.",
    symptoms: [
      "Sedentary stiffness, lower back tension, and joint tightness",
      "Low physical endurance and fatigue with mild physical exertion",
      "Mood sluggishness and poor circulation"
    ],
    selfCare: [
      "Aim for at least 150 minutes of moderate-intensity aerobic activity (e.g., brisk walking, cycling) per week.",
      "Include muscle-strengthening activities involving all major muscle groups on 2 or more days weekly.",
      "Break up long sedentary desk sessions: stand, stretch, and walk for 3-5 minutes every hour.",
      "Always perform a 5-minute dynamic warm-up before exercise and gentle stretches post-workout.",
      "Listen to your body and advance exercise intensity progressively to prevent strain."
    ],
    whenToConsult: [
      "Chest pressure, dizziness, nausea, or severe breathlessness during physical exertion.",
      "Sharp, acute joint or tendon pain that worsens with movement.",
      "Consult a doctor before starting an intense regimen if you have pre-existing cardiovascular conditions."
    ],
    reminder: "Consistency beats intensity—even a daily 20-minute brisk walk yields significant health benefits."
  },
  {
    id: "healthy_eating",
    category: "Nutrition & Diet",
    title: "Healthy Nutrition & Balanced Diet",
    keywords: ["healthy food", "food habits", "diet", "nutrition", "eating healthy", "balanced diet", "vegetables", "vitamins"],
    overview: "A balanced diet provides essential macronutrients (complex carbohydrates, lean proteins, healthy fats) and micronutrients (vitamins and minerals) required for optimal organ function.",
    symptoms: [
      "Digestive sluggishness or irregular bowel habits",
      "Energy spikes followed by mid-day crashes",
      "Nutritional fatigue and dull skin or brittle hair"
    ],
    selfCare: [
      "Fill half your plate with colorful vegetables and whole fruits at main meals.",
      "Choose whole grains (brown rice, oats, whole wheat) over ultra-processed refined flours.",
      "Include quality protein sources: beans, lentils, tofu, eggs, fish, nuts, and seeds.",
      "Limit consumption of ultra-processed foods, high-sodium snacks, and sugary beverages.",
      "Practice mindful eating: chew slowly and stop eating when comfortably satisfied."
    ],
    whenToConsult: [
      "Unexplained, rapid weight loss or sudden substantial weight gain.",
      "Suspected food allergies or severe gastrointestinal intolerances (e.g., celiac disease).",
      "Need for specialized clinical medical nutrition therapy for conditions like diabetes or kidney disorders."
    ],
    reminder: "Avoid extreme restrictive crash diets; sustainable dietary habits produce long-term health."
  },
  {
    id: "mental_wellness",
    category: "Mental Health & Stress",
    title: "Mental Wellness & Stress Reduction",
    keywords: ["mental wellness", "stress", "anxiety", "relaxation", "depression", "overwhelmed", "burnout", "peace of mind"],
    overview: "Mental health is an integral component of overall well-being. Practicing stress management helps regulate cortisol levels and enhances emotional resilience.",
    symptoms: [
      "Persistent feeling of being overwhelmed, restless, or on edge",
      "Muscle tightness, shallow breathing, and tension headaches",
      "Difficulty concentrating and racing thoughts",
      "Changes in appetite or withdrawal from social connections"
    ],
    selfCare: [
      "Practice diaphragmatic breathing: inhale slowly for 4 seconds, hold for 4, exhale for 6.",
      "Establish healthy digital boundaries: limit exposure to distressing news cycles and social media.",
      "Maintain supportive social connections with friends, family, or support networks.",
      "Engage in hobbies, outdoor nature walks, or creative outlets to decompress.",
      "Acknowledge your emotions without self-judgment and prioritize daily downtime."
    ],
    whenToConsult: [
      "Feelings of severe sadness, hopelessness, or inability to perform basic daily activities.",
      "Panic attacks, severe persistent anxiety, or agoraphobia.",
      "If having thoughts of self-harm or suicide, contact emergency services or crisis lifelines immediately (e.g., 988 in the US/Canada)."
    ],
    reminder: "Seeking support from a certified counselor, therapist, or psychiatrist is a sign of strength, not weakness."
  },
  {
    id: "first_aid",
    category: "Emergency & Safety",
    title: "Basic First Aid & Safety",
    keywords: ["first aid", "cuts", "burn", "burns", "scrape", "wound", "bleeding", "minor burn", "safety"],
    overview: "Basic first aid involves prompt, sensible initial care provided for minor injuries until professional medical assistance is obtained or until the injury heals.",
    symptoms: [
      "Minor superficial skin cuts and abrasions",
      "Small 1st-degree superficial heat burns (redness without large blisters)",
      "Mild ankle sprains or blunt bruises"
    ],
    selfCare: [
      "For minor cuts: Wash hands, apply gentle pressure with a clean cloth to stop minor bleeding, rinse gently with clean tap water, and cover with a sterile bandage.",
      "For minor burns: Cool immediately under gently running cool tap water for 10-15 minutes. Do NOT apply ice, butter, or toothpaste.",
      "For minor sprains (R.I.C.E.): Rest, Ice (wrapped in cloth for 15 min), Compression (elastic bandage), and Elevation above heart level.",
      "Keep a fully stocked first-aid kit readily accessible at home and in vehicles."
    ],
    whenToConsult: [
      "Deep, gaping wounds with uncontrolled bleeding or exposure of fat/muscle (requires sutures).",
      "Burns on the face, hands, groin, or any burn that blisters extensively (2nd/3rd degree).",
      "Wounds caused by rusty metal, animal/human bites, or dirty objects (tetanus/rabies evaluation).",
      "Signs of infection: spreading redness, warmth, throbbing pain, or pus discharge."
    ],
    reminder: "Never touch open wounds without clean hands or clean protective barriers."
  },
  {
    id: "preventive_health",
    category: "Preventive Care",
    title: "Preventive Healthcare & Routine Screenings",
    keywords: ["preventive", "prevention", "checkup", "screening", "healthy lifestyle", "maintain health", "vaccine", "wellness check"],
    overview: "Preventive healthcare focuses on proactive measures, regular clinical screenings, and vaccinations to detect and prevent diseases before symptoms emerge.",
    symptoms: [
      "General curiosity regarding proactive wellness and preventive maintenance",
      "Family history of chronic diseases (hypertension, diabetes, cardiovascular disease)"
    ],
    selfCare: [
      "Schedule routine annual physical exams and age-appropriate clinical screenings (blood pressure, blood glucose, cholesterol).",
      "Keep immunizations up to date according to national and local health authority schedules.",
      "Avoid all tobacco products and avoid excessive alcohol consumption.",
      "Practice good hygiene: thorough handwashing with soap for 20 seconds, food hygiene, and dental flossing.",
      "Stay proactive with dental and vision checks every 6 to 12 months."
    ],
    whenToConsult: [
      "Any unexplained persistent bodily changes: unusual lumps, non-healing sores, changing moles.",
      "Sudden unexplained weight loss, chronic digestive alterations, or extreme fatigue."
    ],
    reminder: "Early detection through regular medical checkups dramatically improves clinical outcomes for most conditions."
  }
];

/**
 * High-priority Emergency triggers that require immediate 911/112 intervention
 */
const EMERGENCY_KEYWORDS = [
  "chest pain", "heart attack", "cant breathe", "cannot breathe", "difficulty breathing",
  "shortness of breath", "choking", "stroke", "paralysis", "slurred speech",
  "suicide", "kill myself", "end my life", "severe bleeding", "unconscious",
  "poison", "swallowed poison", "overdose", "seizure"
];
