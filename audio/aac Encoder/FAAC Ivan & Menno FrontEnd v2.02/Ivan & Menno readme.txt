What's new in v2.02:
* Uses new FAAC 1.24 switches. Older versions of FAAC cannot be used with this frontend!

What's new in v2.01:
* Some more FAAC presets.
* 'List' and 'Version' options for MP4Creator.
* The 'Idle priority' checkbox is invisible in Win9x because it's of no use in those operating systems anyway.
* Warning when the FAAC -w option is specified and AAC format is selected at the same time.

What's new in v2.0:
* Added tabs for a hopefully better interface.
* Added support for M4A files.
* Option to run the encoder with idle priority.
* Ivan & Menno will now also search the Path for any of the back-end programs.
* Browse For Folder dialog starts in last selected directory.

What's new in v1.9.1:
* Compatible with the new -w option in FAAC 1.20

What's new in v1.9:
* New MP4Creator (v0.9.8.6)
* MP4Creator option -mpeg-version changed to -aac-profile

What's new in v1.8:
* Separate presets for Psytel and FAAC.
* 'Delete input files' when converting AAC <-> MP4
* With -p (play) or -i (info) options for FAAD only an input file will be on the command line (even when an output directory is selected).

What's new in v1.7:
* Added FAAC and removed aacenc_mpeg4.
* Added more MP4Creator options. Use the version included in this zip-file. It is modified by Enrico Palmeri. Other versions might not work with the frontend.
* In Windows 2000 and XP win2dos.exe is no longer needed (codepage 1252 is used). 
* If the output directory doesn't exist it is created.
* Some small improvements you'll probably won't notice.


Installation:

- Unzip into the directory where you keep aacenc.exe, fastenc.exe, faac.exe, faad.exe and/or mp4creator60.exe.
- Run Ivan & Menno.exe.

Error:

- If you get an error when you try to run Ivan & Menno you probably need the Visual Basic 6 Runtime files. Get it here: http://download.microsoft.com/download/vb60pro/Redist/sp5/WIN98Me/EN-US/vbrun60sp5.exe
- If you have not installed any Microsoft Office product Windows will probably ask for the file mscomctl.ocx. You can get it here:
http://home.wanadoo.nl/~w.speek/download/MSCOMCTL.ZIP


Usage:

- Drag and drop files from Windows Explorer into the Ivan & Menno window or press the "Add Files" button and put files on the list with the "Add Files" dialog.
- Select "Encoder", "Decoder" or "MP4Creator". 
- Select a preset command line or write your own.
- If you like to work on other things while encoding, check "Idle priority" (WinNT only).
- Select an output directory. If you leave the output directory box empty, the output files will be put in the same directory as the source files are in. If the output directory doesn't exist it will be created.
- Hit "Go".
- Note that all that Ivan & Menno does is create and execute a batch file. This is done on the moment you press the "Go" button. So after that you can safely close Ivan & Menno.

Presets:

- Save a command line by pushing the + button
- Remove a command line from the presets by selecting it and pushing the - button
- Alternatively you can edit the file presets.cfg with Notepad (presetsfaac.cfg for FAAC presets; presetsdec.cfg for FAAD presets).

MP4Creator:

The option "Convert: Old AAC format to MP4" refers to files created with aacenc_mpeg4 (and maybe an old FAAC version using the -m4 switch). Those files have 58 bit ADTS headers which are not valid anymore. If you convert them with this switch they can be played in most modern players.

---------------

PsyTEL: http://www.audiocoding.com/wiki/index.php?page=PsyTEL

FAAC and FAAD: http://www.audiocoding.com (also have a look at the knowledge base with lots of info)

Rarewares (AAC and MP4 binaries): www.rarewares.org

MPEG4IP guide: http://www.everwicked.com/content/MPEG4IP_Guide/

---------------

Ivan & Menno is based on the source code of vbLamer by Chetan Sarva, http://sinc.sunysb.edu/stu/csarva/ (website is gone)


Special thanks to: Hans-Jürgen Bardenhagen, Enrico Palmeri, John Edwards, Janne Hyvärinen, Chetan Sarva and Volker Jung.

---------------

Visit Ivan & Menno homepage at:
http://home.wanadoo.nl/w.speek/

Send comments to w.speek@wanadoo.nl
