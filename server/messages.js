const REQUEST_SUBMITTED_FIRST = `Jūsu pieprasījums tiks <b>izskatīts!</b><br> 
Jūs varāt apskātīt tā statusu online, izmantojot sekojošus rekvizītus:<br><br>

e-pasts: EMAIL<br>
parole: PASSWORD<br><br>

Ar cieņu,<br>
LOCATION`;

const CONST_REQUEST_NEW = `Jūsu publisko pasākumu organizēšanas pieprasījums 
(DESCRIPTION) ir saņemts un tuvākā laikā tiks izskatīts. 
Savu publisko pasākumu organizēšanas pieprasījumu Jūs variet apskatīt to, ieejot <www.atlauju.pieprasijums.lv>:<br>
Jūsu lietotājvārds: EMAIL<br>
Jūsu parole: PASSWORD<br>

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

const REQUEST_APPROVED_FILE = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=utf-8">
	<TITLE></TITLE>
</HEAD>
<BODY LANG="lv-LV" LINK="#0000ff" DIR="LTR">
<P ALIGN=CENTER STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">PLCHLD_Location_name</SPAN></FONT></FONT></P>
<P ALIGN=CENTER STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">PLCHLD_Location_address</SPAN></FONT></FONT></P>
<P ALIGN=CENTER STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><B><SPAN STYLE="background: #ffffff">ATĻAUJA</SPAN></B></FONT></FONT></P>
<P ALIGN=CENTER STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">publiska
pasākuma rīkošanai</SPAN></FONT></FONT></P>
<P ALIGN=CENTER STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">PLCHLD_Location_city_loc</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">PLCHLD_Requests_checked_date			<br>		Nr. PLCHLD_Requests_id</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><BR><BR>
</P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">Atļauja
ir izsniegta pamatojoties uz PLCHLD_Requests_create_date PLCHLD_Requests_organizer_name iesniegumu.</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">Pasākuma
organizators:<br>
PLCHLD_Requests_organizer_name,<br>
PLCHLD_Requests_organizer_code,<br>
PLCHLD_Requests_organizer_address</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">Pasākuma
veids un mērķis: <br>PLCHLD_Requests_description</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">Pasākuma
norises vieta: <br>PLCHLD_Requests_address</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><BR><BR>
</P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">Par
tehnisko drošību atbildīgā persona : <br>
PLCHLD_Requests_support_name,<br>
PLCHLD_Requests_support_code,<br>
PLCHLD_Requests_support_address</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">Par
sabiedrisko kārtību un drošību atbildīgā persona :  <br>
PLCHLD_Requests_social_guard_name,<br>
PLCHLD_Requests_social_guard_code,<br>
PLCHLD_Requests_social_guard_address</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">Pasākumā
ir atļauts izmantot bīstamās iekārtas : <br>
PLCHLD_Requests_dangerous</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><BR><BR>
</P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">Atļauja
derīga no PLCHLD_Requests_start_date PLCHLD_Requests_start_time līdz PLCHLD_Requests_finish_date PLCHLD_Requests_finish_time </SPAN></FONT></FONT></P><P ALIGN=CENTER STYLE="margin-bottom: 0.11in"><SPAN STYLE="background: #ffffff">
<FONT FACE="Times New Roman, serif"><FONT SIZE=3>Dokuments ir
sagatavots elektroniski un derīgs bez paraksta.</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><BR><BR>
</P></BODY>
</HTML>`;

const REQUEST_DECLINED = `Jūsu pieprasījums tiek <b>noraidīts!</b><br>
Zemāk Jūs varāt redzēt iemesli:

...

Ar cieņu,<br>
LOCATION`;

const REQUEST_DECLINED_FILE = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=utf-8">
	<TITLE></TITLE>
</HEAD>
<BODY LANG="lv-LV" LINK="#0000ff" DIR="LTR">
<P ALIGN=CENTER STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">PLCHLD_Location_name</SPAN></FONT></FONT></P>
<P ALIGN=CENTER STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">PLCHLD_Location_address</SPAN></FONT></FONT></P>
<P ALIGN=CENTER STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><B><SPAN STYLE="background: #ffffff">LĒMUMS</SPAN></B></FONT></FONT></P>
<P ALIGN=CENTER STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">publiska
pasākuma rīkošanai</SPAN></FONT></FONT></P>
<P ALIGN=CENTER STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">PLCHLD_Location_city_loc</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">PLCHLD_Requests_checked_date			<br>		Nr. PLCHLD_Requests_id</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><BR><BR>
</P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">PLCHLD_Location_name izskatīja PLCHLD_Requests_checked_date<br>
PLCHLD_Requests_organizer_name iesniegumu un nolēma:</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">NEIZSNIEGT
atļauju publiska pasākuma PLCHLD_Requests_description rīkošanai.</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><BR><BR>
</P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">Pasākuma
organizators pašvaldības lēmumu var pārsūdzēt
tiesā</SPAN></FONT></FONT><FONT FACE="Times New Roman, serif"><FONT SIZE=3>&nbsp;</FONT></FONT><FONT FACE="Times New Roman, serif"><FONT SIZE=3><SPAN STYLE="background: #ffffff">noteiktajā
kārtībā.</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><BR><BR>
</P>
<P ALIGN=CENTER STYLE="margin-bottom: 0.11in"><SPAN STYLE="background: #ffffff">
<FONT FACE="Times New Roman, serif"><FONT SIZE=3>Dokuments ir
sagatavots elektroniski un derīgs bez paraksta.</SPAN></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><BR><BR>
</P></BODY>
</HTML>`;

module.exports = {
    REQUEST_SUBMITTED_FIRST,
    REQUEST_SUBMITTED_NEXT,
    REQUEST_APPROVED,
    REQUEST_APPROVED_FILE,
    REQUEST_DECLINED,
    REQUEST_DECLINED_FILE
};