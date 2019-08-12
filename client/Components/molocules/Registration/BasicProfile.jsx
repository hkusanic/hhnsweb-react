import React from 'react';
import { Form, Input, Select, Upload, Button } from 'antd';
import $ from 'jquery';

const FormItem = Form.Item;

const AvatarView = ({ profilePic }) => (
	<React.Fragment>
		<div className="avatar">
			<img src={profilePic} alt="avatar" className="avatar_img" />
		</div>
		<Upload fileList={[]}>
			<div className="button_view">
				<Button icon="upload">Upload Profile Pic</Button>
			</div>
		</Upload>
	</React.Fragment>
);


const timeZones = [
	'Africa/Abidjan',
	'Africa/Accra',
	'Africa/Algiers',
	'Africa/Bissau',
	'Africa/Cairo',
	'Africa/Casablanca',
	'Africa/Ceuta',
	'Africa/El_Aaiun',
	'Africa/Johannesburg',
	'Africa/Juba',
	'Africa/Khartoum',
	'Africa/Lagos',
	'Africa/Maputo',
	'Africa/Monrovia',
	'Africa/Nairobi',
	'Africa/Ndjamena',
	'Africa/Sao_Tome',
	'Africa/Tripoli',
	'Africa/Tunis',
	'Africa/Windhoek',
	'America/Adak',
	'America/Anchorage',
	'America/Araguaina',
	'America/Argentina/Buenos_Aires',
	'America/Argentina/Catamarca',
	'America/Argentina/Cordoba',
	'America/Argentina/Jujuy',
	'America/Argentina/La_Rioja',
	'America/Argentina/Mendoza',
	'America/Argentina/Rio_Gallegos',
	'America/Argentina/Salta',
	'America/Argentina/San_Juan',
	'America/Argentina/San_Luis',
	'America/Argentina/Tucuman',
	'America/Argentina/Ushuaia',
	'America/Asuncion',
	'America/Atikokan',
	'America/Bahia',
	'America/Bahia_Banderas',
	'America/Barbados',
	'America/Belem',
	'America/Belize',
	'America/Blanc-Sablon',
	'America/Boa_Vista',
	'America/Bogota',
	'America/Boise',
	'America/Cambridge_Bay',
	'America/Campo_Grande',
	'America/Cancun',
	'America/Caracas',
	'America/Cayenne',
	'America/Chicago',
	'America/Chihuahua',
	'America/Costa_Rica',
	'America/Creston',
	'America/Cuiaba',
	'America/Curacao',
	'America/Danmarkshavn',
	'America/Dawson',
	'America/Dawson_Creek',
	'America/Denver',
	'America/Detroit',
	'America/Edmonton',
	'America/Eirunepe',
	'America/El_Salvador',
	'America/Fort_Nelson',
	'America/Fortaleza',
	'America/Glace_Bay',
	'America/Godthab',
	'America/Goose_Bay',
	'America/Grand_Turk',
	'America/Guatemala',
	'America/Guayaquil',
	'America/Guyana',
	'America/Halifax',
	'America/Havana',
	'America/Hermosillo',
	'America/Indiana/Indianapolis',
	'America/Indiana/Knox',
	'America/Indiana/Marengo',
	'America/Indiana/Petersburg',
	'America/Indiana/Tell_City',
	'America/Indiana/Vevay',
	'America/Indiana/Vincennes',
	'America/Indiana/Winamac',
	'America/Inuvik',
	'America/Iqaluit',
	'America/Jamaica',
	'America/Juneau',
	'America/Kentucky/Louisville',
	'America/Kentucky/Monticello',
	'America/La_Paz',
	'America/Lima',
	'America/Los_Angeles',
	'America/Maceio',
	'America/Managua',
	'America/Manaus',
	'America/Martinique',
	'America/Matamoros',
	'America/Mazatlan',
	'America/Menominee',
	'America/Merida',
	'America/Metlakatla',
	'America/Mexico_City',
	'America/Miquelon',
	'America/Moncton',
	'America/Monterrey',
	'America/Montevideo',
	'America/Nassau',
	'America/New_York',
	'America/Nipigon',
	'America/Nome',
	'America/Noronha',
	'America/North_Dakota/Beulah',
	'America/North_Dakota/Center',
	'America/North_Dakota/New_Salem',
	'America/Ojinaga',
	'America/Panama',
	'America/Pangnirtung',
	'America/Paramaribo',
	'America/Phoenix',
	'America/Port-au-Prince',
	'America/Port_of_Spain',
	'America/Porto_Velho',
	'America/Puerto_Rico',
	'America/Punta_Arenas',
	'America/Rainy_River',
	'America/Rankin_Inlet',
	'America/Recife',
	'America/Regina',
	'America/Resolute',
	'America/Rio_Branco',
	'America/Santarem',
	'America/Santiago',
	'America/Santo_Domingo',
	'America/Sao_Paulo',
	'America/Scoresbysund',
	'America/Sitka',
	'America/St_Johns',
	'America/Swift_Current',
	'America/Tegucigalpa',
	'America/Thule',
	'America/Thunder_Bay',
	'America/Tijuana',
	'America/Toronto',
	'America/Vancouver',
	'America/Whitehorse',
	'America/Winnipeg',
	'America/Yakutat',
	'America/Yellowknife',
	'Antarctica/Casey',
	'Antarctica/Davis',
	'Antarctica/DumontDUrville',
	'Antarctica/Macquarie',
	'Antarctica/Mawson',
	'Antarctica/Palmer',
	'Antarctica/Rothera',
	'Antarctica/Syowa',
	'Antarctica/Troll',
	'Antarctica/Vostok',
	'Asia/Almaty',
	'Asia/Amman',
	'Asia/Anadyr',
	'Asia/Aqtau',
	'Asia/Aqtobe',
	'Asia/Ashgabat',
	'Asia/Atyrau',
	'Asia/Baghdad',
	'Asia/Baku',
	'Asia/Bangkok',
	'Asia/Barnaul',
	'Asia/Beirut',
	'Asia/Bishkek',
	'Asia/Brunei',
	'Asia/Chita',
	'Asia/Choibalsan',
	'Asia/Colombo',
	'Asia/Damascus',
	'Asia/Dhaka',
	'Asia/Dili',
	'Asia/Dubai',
	'Asia/Dushanbe',
	'Asia/Famagusta',
	'Asia/Gaza',
	'Asia/Hebron',
	'Asia/Ho_Chi_Minh',
	'Asia/Hong_Kong',
	'Asia/Hovd',
	'Asia/Irkutsk',
	'Asia/Jakarta',
	'Asia/Jayapura',
	'Asia/Jerusalem',
	'Asia/Kabul',
	'Asia/Kamchatka',
	'Asia/Karachi',
	'Asia/Kathmandu',
	'Asia/Khandyga',
	'Asia/Kolkata',
	'Asia/Krasnoyarsk',
	'Asia/Kuala_Lumpur',
	'Asia/Kuching',
	'Asia/Macau',
	'Asia/Magadan',
	'Asia/Makassar',
	'Asia/Manila',
	'Asia/Nicosia',
	'Asia/Novokuznetsk',
	'Asia/Novosibirsk',
	'Asia/Omsk',
	'Asia/Oral',
	'Asia/Pontianak',
	'Asia/Pyongyang',
	'Asia/Qatar',
	'Asia/Qostanay',
	'Asia/Qyzylorda',
	'Asia/Riyadh',
	'Asia/Sakhalin',
	'Asia/Samarkand',
	'Asia/Seoul',
	'Asia/Shanghai',
	'Asia/Singapore',
	'Asia/Srednekolymsk',
	'Asia/Taipei',
	'Asia/Tashkent',
	'Asia/Tbilisi',
	'Asia/Tehran',
	'Asia/Thimphu',
	'Asia/Tokyo',
	'Asia/Tomsk',
	'Asia/Ulaanbaatar',
	'Asia/Urumqi',
	'Asia/Ust-Nera',
	'Asia/Vladivostok',
	'Asia/Yakutsk',
	'Asia/Yangon',
	'Asia/Yekaterinburg',
	'Asia/Yerevan',
	'Atlantic/Azores',
	'Atlantic/Bermuda',
	'Atlantic/Canary',
	'Atlantic/Cape_Verde',
	'Atlantic/Faroe',
	'Atlantic/Madeira',
	'Atlantic/Reykjavik',
	'Atlantic/South_Georgia',
	'Atlantic/Stanley',
	'Australia/Adelaide',
	'Australia/Brisbane',
	'Australia/Broken_Hill',
	'Australia/Currie',
	'Australia/Darwin',
	'Australia/Eucla',
	'Australia/Hobart',
	'Australia/Lindeman',
	'Australia/Lord_Howe',
	'Australia/Melbourne',
	'Australia/Perth',
	'Australia/Sydney',
	'CET',
	'CST6CDT',
	'EET',
	'EST',
	'EST5EDT',
	'Etc/GMT',
	'Etc/GMT+1',
	'Etc/GMT+10',
	'Etc/GMT+11',
	'Etc/GMT+12',
	'Etc/GMT+2',
	'Etc/GMT+3',
	'Etc/GMT+4',
	'Etc/GMT+5',
	'Etc/GMT+6',
	'Etc/GMT+7',
	'Etc/GMT+8',
	'Etc/GMT+9',
	'Etc/GMT-1',
	'Etc/GMT-10',
	'Etc/GMT-11',
	'Etc/GMT-12',
	'Etc/GMT-13',
	'Etc/GMT-14',
	'Etc/GMT-2',
	'Etc/GMT-3',
	'Etc/GMT-4',
	'Etc/GMT-5',
	'Etc/GMT-6',
	'Etc/GMT-7',
	'Etc/GMT-8',
	'Etc/GMT-9',
	'Etc/UTC',
	'Europe/Amsterdam',
	'Europe/Andorra',
	'Europe/Astrakhan',
	'Europe/Athens',
	'Europe/Belgrade',
	'Europe/Berlin',
	'Europe/Brussels',
	'Europe/Bucharest',
	'Europe/Budapest',
	'Europe/Chisinau',
	'Europe/Copenhagen',
	'Europe/Dublin',
	'Europe/Gibraltar',
	'Europe/Helsinki',
	'Europe/Istanbul',
	'Europe/Kaliningrad',
	'Europe/Kiev',
	'Europe/Kirov',
	'Europe/Lisbon',
	'Europe/London',
	'Europe/Luxembourg',
	'Europe/Madrid',
	'Europe/Malta',
	'Europe/Minsk',
	'Europe/Monaco',
	'Europe/Moscow',
	'Europe/Oslo',
	'Europe/Paris',
	'Europe/Prague',
	'Europe/Riga',
	'Europe/Rome',
	'Europe/Samara',
	'Europe/Saratov',
	'Europe/Simferopol',
	'Europe/Sofia',
	'Europe/Stockholm',
	'Europe/Tallinn',
	'Europe/Tirane',
	'Europe/Ulyanovsk',
	'Europe/Uzhgorod',
	'Europe/Vienna',
	'Europe/Vilnius',
	'Europe/Volgograd',
	'Europe/Warsaw',
	'Europe/Zaporozhye',
	'Europe/Zurich',
	'HST',
	'Indian/Chagos',
	'Indian/Christmas',
	'Indian/Cocos',
	'Indian/Kerguelen',
	'Indian/Mahe',
	'Indian/Maldives',
	'Indian/Mauritius',
	'Indian/Reunion',
	'MET',
	'MST',
	'MST7MDT',
	'PST8PDT',
	'Pacific/Apia',
	'Pacific/Auckland',
	'Pacific/Bougainville',
	'Pacific/Chatham',
	'Pacific/Chuuk',
	'Pacific/Easter',
	'Pacific/Efate',
	'Pacific/Enderbury',
	'Pacific/Fakaofo',
	'Pacific/Fiji',
	'Pacific/Funafuti',
	'Pacific/Galapagos',
	'Pacific/Gambier',
	'Pacific/Guadalcanal',
	'Pacific/Guam',
	'Pacific/Honolulu',
	'Pacific/Kiritimati',
	'Pacific/Kosrae',
	'Pacific/Kwajalein',
	'Pacific/Majuro',
	'Pacific/Marquesas',
	'Pacific/Nauru',
	'Pacific/Niue',
	'Pacific/Norfolk',
	'Pacific/Noumea',
	'Pacific/Pago_Pago',
	'Pacific/Palau',
	'Pacific/Pitcairn',
	'Pacific/Pohnpei',
	'Pacific/Port_Moresby',
	'Pacific/Rarotonga',
	'Pacific/Tahiti',
	'Pacific/Tarawa',
	'Pacific/Tongatapu',
	'Pacific/Wake',
	'Pacific/Wallis',
	'WET',
];

const countries = [
	{ name: 'Afghanistan', code: 'AF' },
	{ name: 'Åland Islands', code: 'AX' },
	{ name: 'Albania', code: 'AL' },
	{ name: 'Algeria', code: 'DZ' },
	{ name: 'American Samoa', code: 'AS' },
	{ name: 'AndorrA', code: 'AD' },
	{ name: 'Angola', code: 'AO' },
	{ name: 'Anguilla', code: 'AI' },
	{ name: 'Antarctica', code: 'AQ' },
	{ name: 'Antigua and Barbuda', code: 'AG' },
	{ name: 'Argentina', code: 'AR' },
	{ name: 'Armenia', code: 'AM' },
	{ name: 'Aruba', code: 'AW' },
	{ name: 'Australia', code: 'AU' },
	{ name: 'Austria', code: 'AT' },
	{ name: 'Azerbaijan', code: 'AZ' },
	{ name: 'Bahamas', code: 'BS' },
	{ name: 'Bahrain', code: 'BH' },
	{ name: 'Bangladesh', code: 'BD' },
	{ name: 'Barbados', code: 'BB' },
	{ name: 'Belarus', code: 'BY' },
	{ name: 'Belgium', code: 'BE' },
	{ name: 'Belize', code: 'BZ' },
	{ name: 'Benin', code: 'BJ' },
	{ name: 'Bermuda', code: 'BM' },
	{ name: 'Bhutan', code: 'BT' },
	{ name: 'Bolivia', code: 'BO' },
	{ name: 'Bosnia and Herzegovina', code: 'BA' },
	{ name: 'Botswana', code: 'BW' },
	{ name: 'Bouvet Island', code: 'BV' },
	{ name: 'Brazil', code: 'BR' },
	{ name: 'British Indian Ocean Territory', code: 'IO' },
	{ name: 'Brunei Darussalam', code: 'BN' },
	{ name: 'Bulgaria', code: 'BG' },
	{ name: 'Burkina Faso', code: 'BF' },
	{ name: 'Burundi', code: 'BI' },
	{ name: 'Cambodia', code: 'KH' },
	{ name: 'Cameroon', code: 'CM' },
	{ name: 'Canada', code: 'CA' },
	{ name: 'Cape Verde', code: 'CV' },
	{ name: 'Cayman Islands', code: 'KY' },
	{ name: 'Central African Republic', code: 'CF' },
	{ name: 'Chad', code: 'TD' },
	{ name: 'Chile', code: 'CL' },
	{ name: 'China', code: 'CN' },
	{ name: 'Christmas Island', code: 'CX' },
	{ name: 'Cocos (Keeling) Islands', code: 'CC' },
	{ name: 'Colombia', code: 'CO' },
	{ name: 'Comoros', code: 'KM' },
	{ name: 'Congo', code: 'CG' },
	{ name: 'Congo, The Democratic Republic of the', code: 'CD' },
	{ name: 'Cook Islands', code: 'CK' },
	{ name: 'Costa Rica', code: 'CR' },
	{ name: "Cote D'Ivoire", code: 'CI' },
	{ name: 'Croatia', code: 'HR' },
	{ name: 'Cuba', code: 'CU' },
	{ name: 'Cyprus', code: 'CY' },
	{ name: 'Czech Republic', code: 'CZ' },
	{ name: 'Denmark', code: 'DK' },
	{ name: 'Djibouti', code: 'DJ' },
	{ name: 'Dominica', code: 'DM' },
	{ name: 'Dominican Republic', code: 'DO' },
	{ name: 'Ecuador', code: 'EC' },
	{ name: 'Egypt', code: 'EG' },
	{ name: 'El Salvador', code: 'SV' },
	{ name: 'Equatorial Guinea', code: 'GQ' },
	{ name: 'Eritrea', code: 'ER' },
	{ name: 'Estonia', code: 'EE' },
	{ name: 'Ethiopia', code: 'ET' },
	{ name: 'Falkland Islands (Malvinas)', code: 'FK' },
	{ name: 'Faroe Islands', code: 'FO' },
	{ name: 'Fiji', code: 'FJ' },
	{ name: 'Finland', code: 'FI' },
	{ name: 'France', code: 'FR' },
	{ name: 'French Guiana', code: 'GF' },
	{ name: 'French Polynesia', code: 'PF' },
	{ name: 'French Southern Territories', code: 'TF' },
	{ name: 'Gabon', code: 'GA' },
	{ name: 'Gambia', code: 'GM' },
	{ name: 'Georgia', code: 'GE' },
	{ name: 'Germany', code: 'DE' },
	{ name: 'Ghana', code: 'GH' },
	{ name: 'Gibraltar', code: 'GI' },
	{ name: 'Greece', code: 'GR' },
	{ name: 'Greenland', code: 'GL' },
	{ name: 'Grenada', code: 'GD' },
	{ name: 'Guadeloupe', code: 'GP' },
	{ name: 'Guam', code: 'GU' },
	{ name: 'Guatemala', code: 'GT' },
	{ name: 'Guernsey', code: 'GG' },
	{ name: 'Guinea', code: 'GN' },
	{ name: 'Guinea-Bissau', code: 'GW' },
	{ name: 'Guyana', code: 'GY' },
	{ name: 'Haiti', code: 'HT' },
	{ name: 'Heard Island and Mcdonald Islands', code: 'HM' },
	{ name: 'Holy See (Vatican City State)', code: 'VA' },
	{ name: 'Honduras', code: 'HN' },
	{ name: 'Hong Kong', code: 'HK' },
	{ name: 'Hungary', code: 'HU' },
	{ name: 'Iceland', code: 'IS' },
	{ name: 'India', code: 'IN' },
	{ name: 'Indonesia', code: 'ID' },
	{ name: 'Iran, Islamic Republic Of', code: 'IR' },
	{ name: 'Iraq', code: 'IQ' },
	{ name: 'Ireland', code: 'IE' },
	{ name: 'Isle of Man', code: 'IM' },
	{ name: 'Israel', code: 'IL' },
	{ name: 'Italy', code: 'IT' },
	{ name: 'Jamaica', code: 'JM' },
	{ name: 'Japan', code: 'JP' },
	{ name: 'Jersey', code: 'JE' },
	{ name: 'Jordan', code: 'JO' },
	{ name: 'Kazakhstan', code: 'KZ' },
	{ name: 'Kenya', code: 'KE' },
	{ name: 'Kiribati', code: 'KI' },
	{ name: "Korea, Democratic People'S Republic of", code: 'KP' },
	{ name: 'Korea, Republic of', code: 'KR' },
	{ name: 'Kuwait', code: 'KW' },
	{ name: 'Kyrgyzstan', code: 'KG' },
	{ name: "Lao People'S Democratic Republic", code: 'LA' },
	{ name: 'Latvia', code: 'LV' },
	{ name: 'Lebanon', code: 'LB' },
	{ name: 'Lesotho', code: 'LS' },
	{ name: 'Liberia', code: 'LR' },
	{ name: 'Libyan Arab Jamahiriya', code: 'LY' },
	{ name: 'Liechtenstein', code: 'LI' },
	{ name: 'Lithuania', code: 'LT' },
	{ name: 'Luxembourg', code: 'LU' },
	{ name: 'Macao', code: 'MO' },
	{ name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
	{ name: 'Madagascar', code: 'MG' },
	{ name: 'Malawi', code: 'MW' },
	{ name: 'Malaysia', code: 'MY' },
	{ name: 'Maldives', code: 'MV' },
	{ name: 'Mali', code: 'ML' },
	{ name: 'Malta', code: 'MT' },
	{ name: 'Marshall Islands', code: 'MH' },
	{ name: 'Martinique', code: 'MQ' },
	{ name: 'Mauritania', code: 'MR' },
	{ name: 'Mauritius', code: 'MU' },
	{ name: 'Mayotte', code: 'YT' },
	{ name: 'Mexico', code: 'MX' },
	{ name: 'Micronesia, Federated States of', code: 'FM' },
	{ name: 'Moldova, Republic of', code: 'MD' },
	{ name: 'Monaco', code: 'MC' },
	{ name: 'Mongolia', code: 'MN' },
	{ name: 'Montserrat', code: 'MS' },
	{ name: 'Morocco', code: 'MA' },
	{ name: 'Mozambique', code: 'MZ' },
	{ name: 'Myanmar', code: 'MM' },
	{ name: 'Namibia', code: 'NA' },
	{ name: 'Nauru', code: 'NR' },
	{ name: 'Nepal', code: 'NP' },
	{ name: 'Netherlands', code: 'NL' },
	{ name: 'Netherlands Antilles', code: 'AN' },
	{ name: 'New Caledonia', code: 'NC' },
	{ name: 'New Zealand', code: 'NZ' },
	{ name: 'Nicaragua', code: 'NI' },
	{ name: 'Niger', code: 'NE' },
	{ name: 'Nigeria', code: 'NG' },
	{ name: 'Niue', code: 'NU' },
	{ name: 'Norfolk Island', code: 'NF' },
	{ name: 'Northern Mariana Islands', code: 'MP' },
	{ name: 'Norway', code: 'NO' },
	{ name: 'Oman', code: 'OM' },
	{ name: 'Pakistan', code: 'PK' },
	{ name: 'Palau', code: 'PW' },
	{ name: 'Palestinian Territory, Occupied', code: 'PS' },
	{ name: 'Panama', code: 'PA' },
	{ name: 'Papua New Guinea', code: 'PG' },
	{ name: 'Paraguay', code: 'PY' },
	{ name: 'Peru', code: 'PE' },
	{ name: 'Philippines', code: 'PH' },
	{ name: 'Pitcairn', code: 'PN' },
	{ name: 'Poland', code: 'PL' },
	{ name: 'Portugal', code: 'PT' },
	{ name: 'Puerto Rico', code: 'PR' },
	{ name: 'Qatar', code: 'QA' },
	{ name: 'Reunion', code: 'RE' },
	{ name: 'Romania', code: 'RO' },
	{ name: 'Russian Federation', code: 'RU' },
	{ name: 'RWANDA', code: 'RW' },
	{ name: 'Saint Helena', code: 'SH' },
	{ name: 'Saint Kitts and Nevis', code: 'KN' },
	{ name: 'Saint Lucia', code: 'LC' },
	{ name: 'Saint Pierre and Miquelon', code: 'PM' },
	{ name: 'Saint Vincent and the Grenadines', code: 'VC' },
	{ name: 'Samoa', code: 'WS' },
	{ name: 'San Marino', code: 'SM' },
	{ name: 'Sao Tome and Principe', code: 'ST' },
	{ name: 'Saudi Arabia', code: 'SA' },
	{ name: 'Senegal', code: 'SN' },
	{ name: 'Serbia and Montenegro', code: 'CS' },
	{ name: 'Seychelles', code: 'SC' },
	{ name: 'Sierra Leone', code: 'SL' },
	{ name: 'Singapore', code: 'SG' },
	{ name: 'Slovakia', code: 'SK' },
	{ name: 'Slovenia', code: 'SI' },
	{ name: 'Solomon Islands', code: 'SB' },
	{ name: 'Somalia', code: 'SO' },
	{ name: 'South Africa', code: 'ZA' },
	{ name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
	{ name: 'Spain', code: 'ES' },
	{ name: 'Sri Lanka', code: 'LK' },
	{ name: 'Sudan', code: 'SD' },
	{ name: 'Suriname', code: 'SR' },
	{ name: 'Svalbard and Jan Mayen', code: 'SJ' },
	{ name: 'Swaziland', code: 'SZ' },
	{ name: 'Sweden', code: 'SE' },
	{ name: 'Switzerland', code: 'CH' },
	{ name: 'Syrian Arab Republic', code: 'SY' },
	{ name: 'Taiwan, Province of China', code: 'TW' },
	{ name: 'Tajikistan', code: 'TJ' },
	{ name: 'Tanzania, United Republic of', code: 'TZ' },
	{ name: 'Thailand', code: 'TH' },
	{ name: 'Timor-Leste', code: 'TL' },
	{ name: 'Togo', code: 'TG' },
	{ name: 'Tokelau', code: 'TK' },
	{ name: 'Tonga', code: 'TO' },
	{ name: 'Trinidad and Tobago', code: 'TT' },
	{ name: 'Tunisia', code: 'TN' },
	{ name: 'Turkey', code: 'TR' },
	{ name: 'Turkmenistan', code: 'TM' },
	{ name: 'Turks and Caicos Islands', code: 'TC' },
	{ name: 'Tuvalu', code: 'TV' },
	{ name: 'Uganda', code: 'UG' },
	{ name: 'Ukraine', code: 'UA' },
	{ name: 'United Arab Emirates', code: 'AE' },
	{ name: 'United Kingdom', code: 'GB' },
	{ name: 'United States', code: 'US' },
	{ name: 'United States Minor Outlying Islands', code: 'UM' },
	{ name: 'Uruguay', code: 'UY' },
	{ name: 'Uzbekistan', code: 'UZ' },
	{ name: 'Vanuatu', code: 'VU' },
	{ name: 'Venezuela', code: 'VE' },
	{ name: 'Viet Nam', code: 'VN' },
	{ name: 'Virgin Islands, British', code: 'VG' },
	{ name: 'Virgin Islands, U.S.', code: 'VI' },
	{ name: 'Wallis and Futuna', code: 'WF' },
	{ name: 'Western Sahara', code: 'EH' },
	{ name: 'Yemen', code: 'YE' },
	{ name: 'Zambia', code: 'ZM' },
	{ name: 'Zimbabwe', code: 'ZW' },
];
export class BasicProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			upoading: true,
			profilePic: ''
		};
		this.getProfileUrl();
	}

	componentDidMount() {
		this.getProfileUrl();
	}

	getProfileUrl = () => {
		const { userDetails } = this.props;
		if (userDetails.profile_pic === 'Profile pic not available') {
			return 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
		}   
		    return userDetails.profile_pic
	};

	handleFileChange = (info) => {

		if (info.file.status === 'done') {
			this.setState({ upoading: false }, () => {
				this.uploads3(info.file);
			});
		}
	};

	uploads3 = file => {
		console.log('Uploads3-->>', file);
		const fileName = file.name;
		const fileType = file.type;
		$.ajax({
			type: 'GET',
			url: `http://localhost:3000/api/blog/generateUploadUrl?name=folder1/${fileName}&type=${fileType}`,
			success: data => {
				const temp = data.presignedUrl.toString();
				const finalUrl = temp.substr(0, temp.lastIndexOf('?'));
				this.setState({
					profilePic:finalUrl
				})
				this.uploadFileToS3UsingPresignedUrl(data.presignedUrl, file);
			},
			error() {
				notification.error({
					message: 'error',
					description: 'Error occured during uploading, Please try again',
				});
			},
		});
	};

	uploadFileToS3UsingPresignedUrl = (presignedUrl, file) => {
		$.ajax({
			type: 'PUT',
			url: presignedUrl,
			data: file.originFileObj,
			headers: {
				'Content-Type': file.type,
				reportProgress: true,
			},
			processData: false,
			success: data => {
				console.log("succes")
			},
			error() {
				console.error("error")
			},
		});
	};

	dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
		  onSuccess('ok')
		}, 0)
	  }

	render() {
		const { form, userDetails } = this.props;
		const { getFieldDecorator } = form;
		const { profilePic } = this.state;

		return (
			<Form layout="vertical">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="row">
								<div className="col-lg-4">
									<FormItem label="First Name">
										{getFieldDecorator('first', {
											initialValue:
												userDetails && userDetails.name
													? userDetails.name.first
													: '',
										})(<Input autoComplete="off" type="text" />)}
									</FormItem>
								</div>
								<div className="col-lg-4">
									<FormItem label="Last Name">
										{getFieldDecorator('last', {
											initialValue:
												userDetails && userDetails.name
													? userDetails.name.last
													: '',
										})(<Input autoComplete="off" type="text" />)}
									</FormItem>
								</div>
								<div className="col-lg-4">
									<FormItem label="Nickname">
										{getFieldDecorator('nickName', {
											initialValue:
												userDetails && userDetails.userName
													? userDetails.userName
													: '',
											rules: [
												{
													required: true,
													message: 'Please input your Nickname!',
												},
											],
										})(<Input autoComplete="off" type="text" />)}
									</FormItem>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-4">
									<FormItem label="Timezone">
										{form.getFieldDecorator('timezone', {
											initialValue:
												userDetails && userDetails.timeZone
													? userDetails.timeZone
													: '',
										})(
											<Select style={{ maxWidth: 220 }}>
												{timeZones.map((item, index) => {
													return (
														<Option key={index} value={item}>
															{item}
														</Option>
													);
												})}
											</Select>
										)}
									</FormItem>
								</div>
								<div className="col-lg-4">
									<FormItem label="Language">
										{form.getFieldDecorator('language', {
											initialValue:
												userDetails && userDetails.language
													? userDetails.language
													: '',
										})(
											<Select
												id="product-edit-colors"
												showSearch
												style={{ width: '100%' }}
												optionFilterProp="children"
											>
												<Option value="en">English</Option>
												<Option value="ru">Russian</Option>
											</Select>
										)}
									</FormItem>
								</div>
								<div className="col-lg-4">
									<FormItem label="Sadhana Sheets">
										{form.getFieldDecorator('sadhanaSheet', {
											initialValue:
												userDetails && userDetails.sadhanaSheetEnable
													? userDetails.sadhanaSheetEnable
													: '',
										})(
											<Select
												id="product-edit-colors"
												showSearch
												style={{ width: '100%' }}
												optionFilterProp="children"
											>
												<Option value="true">Enable</Option>
												<Option value="false">Disable</Option>
											</Select>
										)}
									</FormItem>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6">
									<FormItem label="Email">
										{getFieldDecorator('email', {
											initialValue:
												userDetails && userDetails.email
													? userDetails.email
													: '',
										})(<Input autoComplete="off" type="email" />)}
									</FormItem>
								</div>
								<div className="col-lg-6">
									<FormItem label="Phone Number">
										{getFieldDecorator('phoneNumber', {
											initialValue:
												userDetails && userDetails.mobileNumber
													? userDetails.mobileNumber
													: '',
										})(<Input autoComplete="off" type="text" />)}
									</FormItem>
								</div>
							</div>
						</div>

						<div className="col-lg-4 imageDiv">
							{/* <AvatarView profilePic={this.getProfileUrl()} /> */}
							<div className="avatar">
								<img src={this.getProfileUrl()} alt="avatar" className="avatar_img" />
							</div>
							<Upload onChange={this.handleFileChange} customRequest={this.dummyRequest} showUploadList={false} >
								<div className="button_view">
									<Button icon="upload">Upload Profile Pic</Button>
								</div>
							</Upload>
						</div>
					</div>

					<div className="row">
						<div className="col-lg-8">
							<FormItem label="Address">
								<Input autoComplete="off" type="text" />
							</FormItem>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-8">
							<FormItem label="Landmark (Optional)">
								<Input autoComplete="off" type="text" />
							</FormItem>
						</div>
					</div>
					<div className="col-lg-8">
						<div className="row">
							<div className="col-lg-4">
								<Form.Item label="City">
									{getFieldDecorator('city', {
										rules: [
											{
												required: true,
												message: 'Please input your city name!',
											},
										],
									})(<Input autoComplete="off" type="text" />)}
								</Form.Item>
							</div>
							<div className="col-lg-4">
								<Form.Item label="Postal Code">
									{getFieldDecorator('postalCode', {
										rules: [
											{
												required: true,
												message: 'Please input your postal Code!',
											},
										],
									})(<Input type="number" autoComplete="off" />)}
								</Form.Item>
							</div>
							<div className="col-lg-4">
								<Form.Item label="Country">
									<Select style={{ maxWidth: 220 }}>
										{countries.map((item, index) => {
											return (
												<Option key={index} value={item.name}>
													{item.name}
												</Option>
											);
										})}
									</Select>
								</Form.Item>
							</div>
						</div>
					</div>
				</div>
			</Form>
		);
	}
}

export default Form.create()(BasicProfile);
