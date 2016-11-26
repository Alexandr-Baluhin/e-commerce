const REQUEST_SUBMITTED_FIRST = `Jūsu pieprasījums tiks <b>izskatīts!</b><br> 
Jūs varāt apskātīt tā statusu online, izmantojot sekojošus rekvizītus:<br><br>

e-pasts: EMAIL<br>
parole: PASSWORD<br><br>

Ar cieņu,<br>
LOCATION`;

const REQUEST_SUBMITTED_NEXT = `Jūsu pieprasījums tiks <b>izskatīts!</b><br> 
Jūs varāt apskātīt tā statusu online, izmantojot iepriekš atsūtītus rekvizītus.<br><br>

Ar cieņu,<br>
LOCATION`;

const REQUEST_APPROVED = `Jūsu pieprasījums tiek <b>apstiprināts!</b><br>
Jūs varāt lejuplādēt apstiprināto pieprasījumu failu.<br><br>

Ar cieņu,<br>
LOCATION`;

const REQUEST_DECLINED = `Jūsu pieprasījums tiek <b>noraidīts!</b><br>
Zemāk Jūs varāt redzēt iemesli:

...

Ar cieņu,<br>
LOCATION`;

module.exports = { REQUEST_SUBMITTED_FIRST, REQUEST_SUBMITTED_NEXT, REQUEST_APPROVED, REQUEST_DECLINED };