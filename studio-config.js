/* Edit this one file to replace proposed business details, prices and sessions.
   All bookings remain explicitly simulated until a real API is connected. */
window.STUDIO = {
  mode: 'preview',
  apiUrl: '',
  name: 'DARKSHELTER',
  host: 'DARKSHELTER',
  location: {el:'Μουτουλλάς · Μαραθάσα · Κύπρος',en:'Moutoullas · Marathasa · Cyprus'},
  email: 'hello@darkshelter.example',
  visitHours: {el:'Πέμπτη–Κυριακή · 10:00–18:00, με ραντεβού',en:'Thursday–Sunday · 10:00–18:00, by appointment'},
  mapUrl:'https://www.google.com/maps/search/?api=1&query=Moutoullas%2C%20Cyprus',
  timezone:'Europe/Nicosia',
  defaultLanguage:'en',
  prices:{club:145,
    /* Private 4-hour darkroom session, total per booking, keyed 'adults-children' (children aged 12+). */
    darkroomSessions:{'1-0':120,'2-0':170,'2-1':195,'2-2':220}},
  sessions:[
    {id:'dr-20261205',type:'darkroom',date:'2026-12-05',start:'10:00',end:'14:00',capacity:4},
    {id:'club-20261212',type:'club',date:'2026-12-12',start:'09:00',end:'17:00',capacity:6},
    {id:'dr-20261219',type:'darkroom',date:'2026-12-19',start:'10:00',end:'14:00',capacity:4},
    {id:'club-20270109',type:'club',date:'2027-01-09',start:'09:00',end:'17:00',capacity:6},
    {id:'dr-20270116',type:'darkroom',date:'2027-01-16',start:'10:00',end:'14:00',capacity:4},
    {id:'club-20270123',type:'club',date:'2027-01-23',start:'09:00',end:'17:00',capacity:6}
  ],
  cameras:[
    {id:'slr',format:'35mm',image:'cameras',position:'20% 62%',name:{el:'35mm SLR',en:'35mm SLR'},lens:'50mm f/1.8',day:18,weekend:35,deposit:150,available:true,
      description:{el:'Χειροκίνητη εστίαση, μέτρηση φωτός και 36 καρέ. Μια καλή αρχή για να γνωρίσεις το φιλμ.',en:'Manual focus, a light meter and 36 frames. A good place to begin your relationship with film.'}},
    {id:'compact',format:'35mm',image:'cameras',position:'83% 42%',name:{el:'35mm rangefinder',en:'35mm rangefinder'},lens:'40mm f/2.8',day:12,weekend:22,deposit:100,available:true,
      description:{el:'Μικρή, διακριτική και εύκολη στη μεταφορά. Για μια βόλτα στο χωριό με ένα ρολό φιλμ.',en:'Small, quiet and easy to carry. Take a walk through the village with a single roll of film.'}},
    {id:'medium',format:'120',image:'cameras',position:'53% 16%',name:{el:'Μεσαίο φορμά · 6×6',en:'Medium format · 6×6'},lens:'80mm f/3.5',day:35,weekend:65,deposit:250,available:true,
      description:{el:'Το κάδρο φαίνεται από ψηλά. Δώδεκα τετράγωνες εικόνες ανά ρολό και χρόνος για κάθε λήψη.',en:'Look down into the finder. Twelve square frames per roll and a little more time for each one.'}},
    {id:'large',format:'4×5',image:'large',position:'50% 45%',name:{el:'Μεγάλο φορμά · 4×5',en:'Large format · 4×5'},lens:'150mm f/5.6',day:45,weekend:85,deposit:300,available:false,
      description:{el:'Τρίποδο, πανί εστίασης και ένα φύλλο φιλμ τη φορά. Διατίθεται και στο πλαίσιο του Club F/65.',en:'A tripod, a dark cloth and one sheet of film at a time. Also part of the Club F/65 experience.'}}
  ]
};
