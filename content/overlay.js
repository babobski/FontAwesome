/**
 * Namespaces
 */
if (typeof(extensions) === 'undefined') extensions = {};
if (typeof(extensions.FontAwesome) === 'undefined') extensions.FontAwesome = {
	version: '1.4'
};

(function() {
	var self = this,
		prefs = Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService).getBranch("extensions.FontAwesome.");

	if (!('FontAwesome' in ko)) ko.extensions = {};
	var myExt = "FontAwesome@babobski.com";
	if (!(myExt in ko.extensions)) ko.extensions[myExt] = {};
	if (!('myapp' in ko.extensions[myExt])) ko.extensions[myExt].myapp = {};
	var FontAwesomeData = ko.extensions[myExt].myapp;

	FontAwesome_insert = function(icon) {
		if (ko.views.manager.currentView == undefined) {
			return;
		}
		var typeInsert = prefs.getCharPref('typeInsert');
		var unicode = getUnicodeFromIcon(icon);
		var entity = '';

		entity = self._buildInsert(typeInsert, icon, unicode);

		try {
			var scimoz = ko.views.manager.currentView.scimoz;
			scimoz.replaceSel('');
			scimoz.insertText(scimoz.currentPos, entity);
			scimoz.gotoPos(scimoz.currentPos + entity.length);
			clearSearch();
			ko.views.manager.currentView.setFocus();
		} catch (ex) {
			alert('No file selected');
		}

	}

	this._buildInsert = function(type, icon, unicode) {
		var d = ko.views.manager.currentView.document || ko.views.manager.currentView.koDoc;
		var file = d.file;
		var result = '';
		switch (type) {
			case 'auto':
				if (file) {
					switch (file.ext) {
						case '.css':
						case '.sass':
						case '.scss':
						case '.less':
							result = self._buildInsert('css', icon, unicode);
							break;
						default:
							result = self._buildInsert('full', icon, unicode);
							break;
					}
				} else {
					result = '<i class="fa ' + icon + '"></i>';
				}
				break;
			case 'full':
				result = '<i class="fa ' + icon + '"></i>';
				break;
			case 'class':
				result = 'fa ' + icon;
				break;
			case 'css':
				result = '\\f' + unicode;
				break;
		}

		return result;
	}

	autoCompleteInsert = function(completion) {
		var icon = 'fa-' + completion.value;
		var unicode = getUnicodeFromIcon(icon);
		FontAwesome_insert(icon, unicode);
	}

	openSettings = function() {
		var features = "chrome,titlebar,toolbar,centerscreen,modal";
		window.openDialog('chrome://FontAwesome/content/pref-overlay.xul', "FontAwesome", features);
	}

	getUnicodeFromIcon = function(icon) {

		var matchIcon = icon.replace(/-/g, '_');
		var matchValues = {
			fa_bluetooth: "293",
			fa_bluetooth_b: "294",
			fa_codiepie: "284",
			fa_credit_card_alt: "283",
			fa_edge: "282",
			fa_fort_awesome: "286",
			fa_hashtag: "292",
			fa_mixcloud: "289",
			fa_modx: "285",
			fa_pause_circle: "28b",
			fa_pause_circle_o: "28c",
			fa_percent: "295",
			fa_product_hunt: "288",
			fa_reddit_alien: "281",
			fa_scribd: "28a",
			fa_shopping_bag: "290",
			fa_shopping_basket: "291",
			fa_stop_circle: "28d",
			fa_stop_circle_o: "28e",
			fa_usb: "287",
			fa_adjust: "042",
			fa_anchor: "13d",
			fa_archive: "187",
			fa_area_chart: "1fe",
			fa_arrows: "047",
			fa_arrows_h: "07e",
			fa_arrows_v: "07d",
			fa_asterisk: "069",
			fa_at: "1fa",
			fa_automobile: "1b9",
			fa_balance_scale: "24e",
			fa_ban: "05e",
			fa_bank: "19c",
			fa_bar_chart: "080",
			fa_bar_chart_o: "080",
			fa_barcode: "02a",
			fa_bars: "0c9",
			fa_battery_0: "244",
			fa_battery_1: "243",
			fa_battery_2: "242",
			fa_battery_3: "241",
			fa_battery_4: "240",
			fa_battery_empty: "244",
			fa_battery_full: "240",
			fa_battery_half: "242",
			fa_battery_quarter: "243",
			fa_battery_three_quarters: "241",
			fa_bed: "236",
			fa_beer: "0fc",
			fa_bell: "0f3",
			fa_bell_o: "0a2",
			fa_bell_slash: "1f6",
			fa_bell_slash_o: "1f7",
			fa_bicycle: "206",
			fa_binoculars: "1e5",
			fa_birthday_cake: "1fd",
			fa_bolt: "0e7",
			fa_bomb: "1e2",
			fa_book: "02d",
			fa_bookmark: "02e",
			fa_bookmark_o: "097",
			fa_briefcase: "0b1",
			fa_bug: "188",
			fa_building: "1ad",
			fa_building_o: "0f7",
			fa_bullhorn: "0a1",
			fa_bullseye: "140",
			fa_bus: "207",
			fa_cab: "1ba",
			fa_calculator: "1ec",
			fa_calendar: "073",
			fa_calendar_check_o: "274",
			fa_calendar_minus_o: "272",
			fa_calendar_o: "133",
			fa_calendar_plus_o: "271",
			fa_calendar_times_o: "273",
			fa_camera: "030",
			fa_camera_retro: "083",
			fa_car: "1b9",
			fa_caret_square_o_down: "150",
			fa_caret_square_o_left: "191",
			fa_caret_square_o_right: "152",
			fa_caret_square_o_up: "151",
			fa_cart_arrow_down: "218",
			fa_cart_plus: "217",
			fa_cc: "20a",
			fa_certificate: "0a3",
			fa_check: "00c",
			fa_check_circle: "058",
			fa_check_circle_o: "05d",
			fa_check_square: "14a",
			fa_check_square_o: "046",
			fa_child: "1ae",
			fa_circle: "111",
			fa_circle_o: "10c",
			fa_circle_o_notch: "1ce",
			fa_circle_thin: "1db",
			fa_clock_o: "017",
			fa_clone: "24d",
			fa_close: "00d",
			fa_cloud: "0c2",
			fa_cloud_download: "0ed",
			fa_cloud_upload: "0ee",
			fa_code: "121",
			fa_code_fork: "126",
			fa_coffee: "0f4",
			fa_cog: "013",
			fa_cogs: "085",
			fa_comment: "075",
			fa_comment_o: "0e5",
			fa_commenting: "27a",
			fa_commenting_o: "27b",
			fa_comments: "086",
			fa_comments_o: "0e6",
			fa_compass: "14e",
			fa_copyright: "1f9",
			fa_creative_commons: "25e",
			fa_credit_card: "09d",
			fa_crop: "125",
			fa_crosshairs: "0c4",
			fa_cube: "1b2",
			fa_cubes: "1b3",
			fa_cutlery: "0f5",
			fa_dashboard: "0e4",
			fa_database: "1c0",
			fa_desktop: "108",
			fa_diamond: "219",
			fa_dot_circle_o: "192",
			fa_download: "019",
			fa_edit: "044",
			fa_ellipsis_h: "141",
			fa_ellipsis_v: "142",
			fa_envelope: "0e0",
			fa_envelope_o: "003",
			fa_envelope_square: "199",
			fa_eraser: "12d",
			fa_exchange: "0ec",
			fa_exclamation: "12a",
			fa_exclamation_circle: "06a",
			fa_exclamation_triangle: "071",
			fa_external_link: "08e",
			fa_external_link_square: "14c",
			fa_eye: "06e",
			fa_eye_slash: "070",
			fa_eyedropper: "1fb",
			fa_fax: "1ac",
			fa_feed: "09e",
			fa_female: "182",
			fa_fighter_jet: "0fb",
			fa_file_archive_o: "1c6",
			fa_file_audio_o: "1c7",
			fa_file_code_o: "1c9",
			fa_file_excel_o: "1c3",
			fa_file_image_o: "1c5",
			fa_file_movie_o: "1c8",
			fa_file_pdf_o: "1c1",
			fa_file_photo_o: "1c5",
			fa_file_picture_o: "1c5",
			fa_file_powerpoint_o: "1c4",
			fa_file_sound_o: "1c7",
			fa_file_video_o: "1c8",
			fa_file_word_o: "1c2",
			fa_file_zip_o: "1c6",
			fa_film: "008",
			fa_filter: "0b0",
			fa_fire: "06d",
			fa_fire_extinguisher: "134",
			fa_flag: "024",
			fa_flag_checkered: "11e",
			fa_flag_o: "11d",
			fa_flash: "0e7",
			fa_flask: "0c3",
			fa_folder: "07b",
			fa_folder_o: "114",
			fa_folder_open: "07c",
			fa_folder_open_o: "115",
			fa_frown_o: "119",
			fa_futbol_o: "1e3",
			fa_gamepad: "11b",
			fa_gavel: "0e3",
			fa_gear: "013",
			fa_gears: "085",
			fa_gift: "06b",
			fa_glass: "000",
			fa_globe: "0ac",
			fa_graduation_cap: "19d",
			fa_group: "0c0",
			fa_hand_grab_o: "255",
			fa_hand_lizard_o: "258",
			fa_hand_paper_o: "256",
			fa_hand_peace_o: "25b",
			fa_hand_pointer_o: "25a",
			fa_hand_rock_o: "255",
			fa_hand_scissors_o: "257",
			fa_hand_spock_o: "259",
			fa_hand_stop_o: "256",
			fa_hdd_o: "0a0",
			fa_headphones: "025",
			fa_heart: "004",
			fa_heart_o: "08a",
			fa_heartbeat: "21e",
			fa_history: "1da",
			fa_home: "015",
			fa_hotel: "236",
			fa_hourglass: "254",
			fa_hourglass_1: "251",
			fa_hourglass_2: "252",
			fa_hourglass_3: "253",
			fa_hourglass_end: "253",
			fa_hourglass_half: "252",
			fa_hourglass_o: "250",
			fa_hourglass_start: "251",
			fa_i_cursor: "246",
			fa_image: "03e",
			fa_inbox: "01c",
			fa_industry: "275",
			fa_info: "129",
			fa_info_circle: "05a",
			fa_institution: "19c",
			fa_key: "084",
			fa_keyboard_o: "11c",
			fa_language: "1ab",
			fa_laptop: "109",
			fa_leaf: "06c",
			fa_legal: "0e3",
			fa_lemon_o: "094",
			fa_level_down: "149",
			fa_level_up: "148",
			fa_life_bouy: "1cd",
			fa_life_buoy: "1cd",
			fa_life_ring: "1cd",
			fa_life_saver: "1cd",
			fa_lightbulb_o: "0eb",
			fa_line_chart: "201",
			fa_location_arrow: "124",
			fa_lock: "023",
			fa_magic: "0d0",
			fa_magnet: "076",
			fa_mail_forward: "064",
			fa_mail_reply: "112",
			fa_mail_reply_all: "122",
			fa_male: "183",
			fa_map: "279",
			fa_map_marker: "041",
			fa_map_o: "278",
			fa_map_pin: "276",
			fa_map_signs: "277",
			fa_meh_o: "222",
			fa_microphone: "130",
			fa_microphone_slash: "131",
			fa_minus: "068",
			fa_minus_circle: "056",
			fa_minus_square: "146",
			fa_minus_square_o: "147",
			fa_mobile: "10b",
			fa_mobile_phone: "10b",
			fa_money: "0d6",
			fa_moon_o: "186",
			fa_mortar_board: "19d",
			fa_motorcycle: "21c",
			fa_music: "001",
			fa_navicon: "0c9",
			fa_newspaper_o: "1ea",
			fa_object_group: "247",
			fa_object_ungroup: "248",
			fa_paint_brush: "1fc",
			fa_paper_plane: "1d8",
			fa_paper_plane_o: "1d9",
			fa_paw: "1b0",
			fa_pencil: "040",
			fa_pencil_square: "14b",
			fa_pencil_square_o: "044",
			fa_phone: "095",
			fa_phone_square: "098",
			fa_photo: "03e",
			fa_picture_o: "03e",
			fa_pie_chart: "200",
			fa_plane: "072",
			fa_plug: "1e6",
			fa_plus: "067",
			fa_plus_circle: "055",
			fa_plus_square: "0fe",
			fa_plus_square_o: "196",
			fa_power_off: "011",
			fa_print: "02f",
			fa_puzzle_piece: "12e",
			fa_qrcode: "029",
			fa_question: "128",
			fa_question_circle: "059",
			fa_quote_left: "10d",
			fa_quote_right: "10e",
			fa_random: "074",
			fa_recycle: "1b8",
			fa_refresh: "021",
			fa_registered: "25d",
			fa_remove: "00d",
			fa_reorder: "0c9",
			fa_reply: "112",
			fa_reply_all: "122",
			fa_retweet: "079",
			fa_road: "018",
			fa_rocket: "135",
			fa_rss: "09e",
			fa_rss_square: "143",
			fa_search: "002",
			fa_search_minus: "010",
			fa_search_plus: "00e",
			fa_send: "1d8",
			fa_send_o: "1d9",
			fa_server: "233",
			fa_share: "064",
			fa_share_alt: "1e0",
			fa_share_alt_square: "1e1",
			fa_share_square: "14d",
			fa_share_square_o: "045",
			fa_shield: "132",
			fa_ship: "21a",
			fa_shopping_cart: "07a",
			fa_sign_in: "090",
			fa_sign_out: "08b",
			fa_signal: "012",
			fa_sitemap: "0e8",
			fa_sliders: "1de",
			fa_smile_o: "118",
			fa_soccer_ball_o: "1e3",
			fa_sort: "0dc",
			fa_sort_alpha_asc: "15d",
			fa_sort_alpha_desc: "15e",
			fa_sort_amount_asc: "160",
			fa_sort_amount_desc: "161",
			fa_sort_asc: "0de",
			fa_sort_desc: "0dd",
			fa_sort_down: "0dd",
			fa_sort_numeric_asc: "197",
			fa_sort_numeric_desc: "163",
			fa_sort_up: "0de",
			fa_space_shuttle: "197",
			fa_spinner: "110",
			fa_spoon: "1b1",
			fa_square: "0c8",
			fa_square_o: "096",
			fa_star: "005",
			fa_star_half: "089",
			fa_star_half_empty: "123",
			fa_star_half_full: "123",
			fa_star_half_o: "123",
			fa_star_o: "006",
			fa_sticky_note: "249",
			fa_sticky_note_o: "24a",
			fa_street_view: "21d",
			fa_suitcase: "0f2",
			fa_sun_o: "185",
			fa_support: "1cd",
			fa_tablet: "10a",
			fa_tachometer: "0e4",
			fa_tag: "02b",
			fa_tags: "02c",
			fa_tasks: "0ae",
			fa_taxi: "1ba",
			fa_television: "26c",
			fa_terminal: "120",
			fa_thumb_tack: "08d",
			fa_thumbs_down: "165",
			fa_thumbs_o_down: "088",
			fa_thumbs_o_up: "087",
			fa_thumbs_up: "164",
			fa_ticket: "145",
			fa_times: "00d",
			fa_times_circle: "057",
			fa_times_circle_o: "05c",
			fa_tint: "043",
			fa_toggle_down: "150",
			fa_toggle_left: "191",
			fa_toggle_off: "204",
			fa_toggle_on: "205",
			fa_toggle_right: "152",
			fa_toggle_up: "151",
			fa_trademark: "25c",
			fa_trash: "1f8",
			trash_o: "014",
			fa_tree: "1bb",
			fa_trophy: "091",
			fa_truck: "0d1",
			fa_tty: "195",
			fa_tv: "1e4",
			fa_umbrella: "173",
			fa_university: "19c",
			fa_unlock: "09c",
			fa_unlock_alt: "13e",
			fa_unsorted: "0dc",
			fa_upload: "093",
			fa_user: "287",
			fa_user_plus: "155",
			fa_user_secret: "007",
			fa_user_times: "235",
			fa_users: "0c0",
			fa_video_camera: "221",
			fa_volume_down: "226",
			fa_volume_off: "026",
			fa_volume_up: "028",
			fa_warning: "071",
			fa_wheelchair: "1d7",
			fa_wifi: "1eb",
			fa_wrench: "0ad",
			fa_hand_o_down: "0a7",
			fa_hand_o_left: "0a5",
			fa_hand_o_right: "0a4",
			fa_hand_o_up: "0a6",
			fa_ambulance: "0f9",
			fa_subway: "239",
			fa_train: "238",
			fa_genderless: "22d",
			fa_intersex: "224",
			fa_mars: "222",
			fa_mars_double: "227",
			fa_mars_stroke: "229",
			fa_mars_stroke_h: "22b",
			fa_mars_stroke_v: "22a",
			fa_mercury: "223",
			fa_neuter: "22c",
			fa_transgender: "224",
			fa_transgender_alt: "225",
			fa_venus: "221",
			fa_venus_double: "226",
			fa_venus_mars: "228",
			fa_file: "15b",
			fa_file_o: "016",
			fa_file_text: "15c",
			fa_file_text_o: "0f6",
			fa_cc_amex: "1f3",
			fa_cc_diners_club: "24c",
			fa_cc_discover: "1f2",
			fa_cc_jcb: "24b",
			fa_cc_mastercard: "1f1",
			fa_cc_paypal: "1f4",
			fa_cc_stripe: "1f5",
			fa_cc_visa: "1f0",
			fa_google_wallet: "1ee",
			fa_paypal: "1ed",
			fa_bitcoin: "15a",
			fa_btc: "15a",
			fa_cny: "157",
			fa_dollar: "155",
			fa_eur: "153",
			fa_euro: "153",
			fa_gbp: "154",
			fa_gg: "260",
			fa_gg_circle: "261",
			fa_ils: "20b",
			fa_inr: "156",
			fa_jpy: "157",
			fa_krw: "159",
			fa_rmb: "157",
			fa_rouble: "158",
			fa_rub: "158",
			fa_ruble: "158",
			fa_rupee: "156",
			fa_shekel: "20b",
			fa_sheqel: "20b",
			fa_try: "195",
			fa_turkish_lira: "195",
			fa_usd: "155",
			fa_won: "159",
			fa_yen: "157",
			fa_align_center: "037",
			fa_align_justify: "039",
			fa_align_left: "036",
			fa_align_right: "038",
			fa_bold: "032",
			fa_chain: "0c1",
			fa_chain_broken: "127",
			fa_clipboard: "0ea",
			fa_columns: "0db",
			fa_copy: "0c5",
			fa_cut: "0c4",
			fa_dedent: "03b",
			fa_files_o: "0c5",
			fa_floppy_o: "0c7",
			fa_font: "031",
			fa_header: "1dc",
			fa_indent: "03c",
			fa_italic: "033",
			fa_link: "0c1",
			fa_list: "03a",
			fa_list_alt: "022",
			fa_list_ol: "0cb",
			fa_list_ul: "0ca",
			fa_outdent: "03b",
			fa_paperclip: "0c6",
			fa_paragraph: "1dd",
			fa_paste: "0ea",
			fa_repeat: "01e",
			fa_rotate_left: "0e2",
			fa_rotate_right: "01e",
			fa_save: "0c7",
			fa_scissors: "0c4",
			fa_strikethrough: "0cc",
			fa_subscript: "12c",
			fa_superscript: "12b",
			fa_table: "0ce",
			fa_text_height: "034",
			fa_text_width: "035",
			fa_th: "00a",
			fa_th_large: "009",
			fa_th_list: "00b",
			fa_underline: "0cd",
			fa_undo: "0e2",
			fa_unlink: "127",
			fa_angle_double_down: "103",
			fa_angle_double_left: "100",
			fa_angle_double_right: "101",
			fa_angle_double_up: "102",
			fa_angle_down: "107",
			fa_angle_left: "104",
			fa_angle_right: "105",
			fa_angle_up: "106",
			fa_arrow_circle_down: "0ab",
			fa_arrow_circle_left: "0a8",
			fa_arrow_circle_o_down: "01a",
			fa_arrow_circle_o_left: "190",
			fa_arrow_circle_o_right: "18e",
			fa_arrow_circle_o_up: "01b",
			fa_arrow_circle_right: "0a9",
			fa_arrow_circle_up: "0aa",
			fa_arrow_down: "063",
			fa_arrow_left: "060",
			fa_arrow_right: "061",
			fa_arrow_up: "062",
			fa_arrows_alt: "047",
			fa_caret_down: "0d7",
			fa_caret_left: "0d9",
			fa_caret_right: "0da",
			fa_caret_up: "0d8",
			fa_chevron_circle_down: "13a",
			fa_chevron_circle_left: "137",
			fa_chevron_circle_right: "138",
			fa_chevron_circle_up: "139",
			fa_chevron_down: "078",
			fa_chevron_left: "053",
			fa_chevron_right: "054",
			fa_chevron_up: "077",
			fa_long_arrow_down: "175",
			fa_long_arrow_left: "177",
			fa_long_arrow_right: "178",
			fa_long_arrow_up: "176",
			fa_backward: "04a",
			fa_compress: "066",
			fa_eject: "052",
			fa_expand: "065",
			fa_fast_backward: "049",
			fa_fast_forward: "050",
			fa_forward: "04e",
			fa_pause: "04c",
			fa_play: "04b",
			fa_play_circle: "144",
			fa_play_circle_o: "01d",
			fa_step_backward: "048",
			fa_step_forward: "051",
			fa_stop: "04d",
			fa_youtube_play: "16a",
			fa_500px: "26e",
			fa_adn: "170",
			fa_amazon: "270",
			fa_android: "17b",
			fa_angellist: "209",
			fa_apple: "179",
			fa_behance: "1b4",
			fa_behance_square: "1b5",
			fa_bitbucket: "171",
			fa_bitbucket_square: "172",
			fa_black_tie: "27e",
			fa_buysellads: "20d",
			fa_chrome: "268",
			fa_codepen: "1cb",
			fa_codiepie: "284",
			fa_connectdevelop: "20e",
			fa_contao: "26d",
			fa_credit_card_alt: "283",
			fa_css3: "13c",
			fa_dashcube: "210",
			fa_delicious: "1a5",
			fa_deviantart: "1bd",
			fa_digg: "1a6",
			fa_dribbble: "17d",
			fa_dropbox: "16b",
			fa_drupal: "1a9",
			fa_empire: "1d1",
			fa_expeditedssl: "23e",
			fa_facebook: "09a",
			fa_facebook_f: "09a",
			fa_facebook_official: "230",
			fa_facebook_square: "082",
			fa_firefox: "269",
			fa_flickr: "16e",
			fa_fonticons: "280",
			fa_forumbee: "211",
			fa_foursquare: "180",
			fa_ge: "1d1",
			fa_get_pocket: "265",
			fa_git: "1d3",
			fa_git_square: "1d2",
			fa_github: "09b",
			fa_github_alt: "113",
			fa_github_square: "092",
			fa_gittip: "184",
			fa_google: "1a0",
			fa_google_plus: "0d5",
			fa_google_plus_square: "0d4",
			fa_gratipay: "184",
			fa_hacker_news: "1d4",
			fa_houzz: "27c",
			fa_html5: "13b",
			fa_instagram: "16d",
			fa_internet_explorer: "26b",
			fa_ioxhost: "208",
			fa_joomla: "1aa",
			fa_jsfiddle: "1cc",
			fa_lastfm: "202",
			fa_lastfm_square: "203",
			fa_leanpub: "212",
			fa_linkedin: "0e1",
			fa_linkedin_square: "08c",
			fa_linux: "17c",
			fa_maxcdn: "136",
			fa_meanpath: "20c",
			fa_medium: "23a",
			fa_odnoklassniki: "263",
			fa_odnoklassniki_square: "264",
			fa_opencart: "23d",
			fa_openid: "19b",
			fa_opera: "26a",
			fa_optin_monster: "23c",
			fa_pagelines: "18c",
			fa_pied_piper: "1a7",
			fa_pied_piper_alt: "1a8",
			fa_pinterest: "0d2",
			fa_pinterest_p: "231",
			fa_pinterest_square: "0d3",
			fa_qq: "1d6",
			fa_ra: "1d0",
			fa_rebel: "1d0",
			fa_reddit: "1a1",
			fa_reddit_square: "1a2",
			fa_renren: "18b",
			fa_safari: "267",
			fa_sellsy: "213",
			fa_shirtsinbulk: "214",
			fa_simplybuilt: "215",
			fa_skyatlas: "216",
			fa_skype: "17e",
			fa_slack: "198",
			fa_slideshare: "1e7",
			fa_soundcloud: "1be",
			fa_spotify: "1bc",
			fa_stack_exchange: "18d",
			fa_stack_overflow: "16c",
			fa_steam: "1b6",
			fa_steam_square: "1b7",
			fa_stumbleupon: "1a4",
			fa_stumbleupon_circle: "1a3",
			fa_tencent_weibo: "1d5",
			fa_trello: "181",
			fa_tripadvisor: "262",
			fa_tumblr: "173",
			fa_tumblr_square: "174",
			fa_twitch: "1e8",
			fa_twitter: "099",
			fa_twitter_square: "081",
			fa_viacoin: "237",
			fa_vimeo: "27d",
			fa_vimeo_square: "194",
			fa_vine: "1ca",
			fa_vk: "189",
			fa_wechat: "1d7",
			fa_weibo: "18a",
			fa_weixin: "1d7",
			fa_whatsapp: "232",
			fa_wikipedia_w: "266",
			fa_windows: "17a",
			fa_wordpress: "19a",
			fa_xing: "168",
			fa_xing_square: "169",
			fa_y_combinator: "23b",
			fa_y_combinator_square: "1d4",
			fa_yahoo: "19e",
			fa_yc: "23b",
			fa_yc_square: "1d4",
			fa_yelp: "1e9",
			fa_youtube: "167",
			fa_youtube_square: "166",
			fa_h_square: "0fd",
			fa_hospital_o: "0f8",
			fa_medkit: "0fa",
			fa_stethoscope: "0f1",
			fa_user_md: "0f0",
			fa_american_sign_language_interpreting: "2A3",
			fa_asl_interpreting: "2A3",
			fa_assistive_listening_systems: "2A2",
			fa_audio_description: "29E",
			fa_blind: "29D",
			fa_braille: "2A1",
			fa_deaf: "2A4",
			fa_deafness: "2A4",
			fa_envira: "299",
			fa_fa: "2B4",
			fa_first_order: "2B0",
			fa_font_awesome: "2B4",
			fa_gitlab: "296",
			fa_glide: "2A5",
			fa_glide_g: "2A6",
			fa_google_plus_circle: "2B3",
			fa_google_plus_official: "2B3",
			fa_hard_of_hearing: "2A4",
			fa_instagram: "16D",
			fa_low_vision: "2A8",
			fa_pied_piper: "2AE",
			fa_question_circle_o: "29C",
			fa_sign_language: "2A7",
			fa_signing: "2A7",
			fa_snapchat: "2AB",
			fa_snapchat_ghost: "2AC",
			fa_snapchat_square: "2AD",
			fa_themeisle: "2B2",
			fa_universal_access: "29A",
			fa_viadeo: "2A9",
			fa_viadeo_square: "2AA",
			fa_volume_control_phone: "2A0",
			fa_wheelchair_alt: "29B",
			fa_wpbeginner: "297",
			fa_wpforms: "298",
		}

		return matchValues[matchIcon];
	}

	insertCDN = function() {
		if (ko.views.manager.currentView == undefined) {
			return;
		}

		try {
			var CDN = '//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css';
			var scimoz = ko.views.manager.currentView.scimoz;
			scimoz.replaceSel('');
			scimoz.insertText(scimoz.currentPos, CDN);
			scimoz.gotoPos(scimoz.currentPos + CDN.length);
			ko.views.manager.currentView.setFocus();
		} catch (ex) {
			alert('No file selected');
		}
	}

	insertFF = function() {
		if (ko.views.manager.currentView == undefined) {
			return;
		}

		try {
			var FF = 'font-family: \'FontAwesome\';';
			var scimoz = ko.views.manager.currentView.scimoz;
			scimoz.replaceSel('');
			scimoz.insertText(scimoz.currentPos, FF);
			scimoz.gotoPos(scimoz.currentPos + FF.length);
			ko.views.manager.currentView.setFocus();
		} catch (ex) {
			alert('No file selected');
		}
	}

	clearSearch = function() {
		var input = document.getElementById('text1');
		var font_wrapper = document.getElementById('font_fa');
		var fa_buttoms = font_wrapper.getElementsByTagName('button');

		input.value = '';


		for (var i = 0; i < fa_buttoms.length; i++) {
			var childClasses = fa_buttoms[i].childNodes[0].classList;
			if (childClasses.length > 1) {
				if (fa_buttoms[i].classList.contains('none')) {
					fa_buttoms[i].classList.remove('none');
				}
			}
		}



		font_wrapper.classList.remove('insearch');
	}

	searchIcon = function(e) {

		var font_wrapper = document.getElementById('font_fa');
		var fa_buttoms = font_wrapper.getElementsByTagName('button');
		var $val = e.target.value;
		var searchValue = 'fa-' + $val;

		for (var i = 0; i < fa_buttoms.length; i++) {
			var childClasses = fa_buttoms[i].childNodes[0].classList;
			if (childClasses.length > 1) {
				if (childClasses[1].indexOf(searchValue) !== -1) {
					if (fa_buttoms[i].classList.contains('none')) {
						fa_buttoms[i].classList.remove('none');
					}
				} else {
					fa_buttoms[i].classList.add('none');
				}
			}
		}

		if ($val.length > 0) {
			if (!font_wrapper.classList.contains('insearch')) {
				font_wrapper.classList.add('insearch');
			}
		} else {
			font_wrapper.classList.remove('insearch');
		}
	}

}).apply(extensions.FontAwesome);