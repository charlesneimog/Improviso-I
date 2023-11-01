let x1;
let y1;
let f;
let lletra;
let nombre;
let str;
let frameCountValue;
let notaParaGesto;

// POEMA
const ADAO_NORMAL = [
	['Ocre caminhar', ['ocre', 'ca', 'mi', 'nhar'], [0.25, 0.25, 0.25, 0.25]],
	["D'olhos cansados à macieira", ["d'o", 'lhos', 'can', 'sa', 'dos', 'à', 'ma', 'ci', 'ei', 'ra'], [0.1, 0.04, 0.16, 0.13, 0.05, 0.13, 0.04, 0.04, 0.19, 0.12]],
	['Olhara o corpo de esguio timbre', ['olha', 'ra', 'o', 'cor', 'po', 'de', 'es', 'guio', 'tim', 'bre'], [0.17, 0.22, 0.01, 0.16, 0.01, 0.04, 0.04, 0.23, 0.04, 0.08]],
	['Tanto daquela', ['tan', 'to', 'da', 'que', 'la'], [0.35, 0.07, 0.24, 0.06, 0.28]],
	['quanto daquilo.', ['quan', 'to', 'da', 'qui', 'lo'], [0.34, 0.1, 0.03, 0.24, 0.29]],
	['Semblante cálido ao piche anda', ['sem', 'blan', 'te', 'cá', 'li', 'do', 'ao', 'pi', 'che', 'an', 'da'], [0.13, 0.14, 0.0, 0.13, 0.05, 0.09, 0.16, 0.12, 0.04, 0.08, 0.06]],
	['Quebrada a regra', ['que', 'bra', 'da', 'a', 're', 'gra'], [0.18, 0.06, 0.25, 0.25, 0.01, 0.25]],
	['ventos que sopram', ['ven', 'tos', 'que', 'so', 'pram'], [0.06, 0.25, 0.22, 0.21, 0.26]],
	['Fez a si homem na relva prata.', ['fez', 'a', 'si', 'ho', 'mem', 'na', 'rel', 'va', 'pra', 'ta'], [0.16, 0.09, 0.07, 0.14, 0.01, 0.05, 0.1, 0.15, 0.08, 0.16]],
	['Dá vida o gosto de terra seca.', ['dá', 'vi', 'da', 'o', 'gos', 'to', 'de', 'ter', 'ra', 'se', 'ca'], [0.08, 0.15, 0.15, 0.06, 0.17, 0.08, 0.01, 0.0, 0.1, 0.16, 0.03]],
	['Sangrar-se-á.', ['san', 'grar', 'se', 'á'], [0.32, 0.22, 0.04, 0.42]],
];

const LAMENTACAO_NORMAL = [
	['Outrora o templo de Deus habitara', ['ou', 'tro', 'ra', 'o', 'tem', 'plo', 'de', 'deus', 'ha', 'bi', 'ta'], [0.0, 0.16, 0.07, 0.0, 0.08, 0.15, 0.06, 0.18, 0.11, 0.03, 0.16]],
	['Quente sua língua, ', ['quen', 'te', 'sua', 'lín', 'gua'], [0.43, 0.04, 0.06, 0.4, 0.07]],
	["s'alimentara", ["s'a", 'li', 'men', 'ta', 'ra'], [0.19, 0.14, 0.23, 0.28, 0.16]],
	["Desta que em riste sorvia n'alma: ", ['des', 'ta', 'que', 'em', 'ris', 'te', 'sor', 'via', "n'al", 'ma:'], [0.09, 0.09, 0.17, 0.08, 0.06, 0.18, 0.19, 0.06, 0.01, 0.07]],
	['Maná; e Ambrosia.', ['ma', 'ná;', 'e', 'am', 'bro', 'sia'], [0.04, 0.09, 0.29, 0.37, 0.03, 0.18]],
	['De deus na boca tínhamos casa,', ['de', 'deus', 'na', 'bo', 'ca', 'tí', 'nha', 'mos', 'sa'], [0.08, 0.16, 0.19, 0.01, 0.1, 0.08, 0.17, 0.18, 0.03]],
	['de nosso o lar, ', ['de', 'nos', 'so', 'o', 'lar'], [0.3, 0.03, 0.24, 0.05, 0.38]],
	['agora ingrato.', ['ago', 'ra', 'in', 'gra', 'to'], [0.47, 0.04, 0.03, 0.12, 0.34]],
	['Desta suas mãos provia afago,', ['des', 'ta', 'su', 'as', 'mãos', 'pro', 'via', 'afa', 'go'], [0.18, 0.08, 0.11, 0.14, 0.09, 0.09, 0.14, 0.1, 0.07]],
	['Dos pés daquele: ', ['dos', 'pés', 'da', 'que', 'le:'], [0.19, 0.29, 0.3, 0.08, 0.14]],
	['a reverência', ['a', 're', 've', 'rên', 'cia'], [0.16, 0.23, 0.26, 0.13, 0.22]],
	['Torna-te agora senhor das armas, ', ['tor', 'na', 'te', 'ago', 'ra', 'se', 'nhor', 'das', 'ar', 'mas'], [0.17, 0.14, 0.06, 0.03, 0.18, 0.13, 0.03, 0.08, 0.01, 0.17]],
	['piedade fora de ti nã’alcança.', ['pi', 'e', 'da', 'de', 'fo', 'ra', 'ti', 'nã’al', 'can', 'ça'], [0.14, 0.14, 0.06, 0.06, 0.04, 0.08, 0.17, 0.19, 0.02, 0.1]],
	['Aqui jaz esperança, ', ['aqui', 'jaz', 'es', 'pe', 'ran', 'ça'], [0.1, 0.13, 0.22, 0.22, 0.3, 0.03]],
	['honra e furor: ', ['hon', 'ra', 'e', 'fu', 'ror:'], [0.17, 0.12, 0.27, 0.23, 0.21]],
	['à porta do paraíso.', ['à', 'por', 'ta', 'do', 'pa', 'ra', 'í', 'so'], [0.21, 0.01, 0.2, 0.14, 0.01, 0.06, 0.2, 0.17]],
];

const CAMINHAM_NO_DESERTO_NORMAL = [
	['Ah, Ah, que este solo que aos pés recua', ['ah', 'que', 'es', 'te', 'so', 'lo', 'aos', 'pés', 're', 'cua'], [0.05, 0.13, 0.13, 0.07, 0.06, 0.17, 0.08, 0.03, 0.1, 0.18]],
	['Que a pele deste tanto é tão fina, ', ['que', 'a', 'pe', 'le', 'des', 'te', 'tan', 'to', 'é', 'tão', 'fi', 'na'], [0.06, 0.1, 0.14, 0.04, 0.02, 0.15, 0.11, 0.14, 0.08, 0.03, 0.06, 0.07]],
	['assim pois não', ['as', 'sim', 'pois', 'não'], [0.37, 0.49, 0.0, 0.14]],
	['costume tinha: ', ['cos', 'tu', 'me', 'ti', 'nha:'], [0.09, 0.25, 0.2, 0.23, 0.23]],
	['o sol, ', ['o', 'sol'], [0.65, 0.35]],
	['perdida a graça, ', ['per', 'di', 'da', 'a', 'gra', 'ça'], [0.22, 0.03, 0.18, 0.17, 0.23, 0.17]],
	['reclama-te!', ['re', 'cla', 'ma', 'te'], [0.23, 0.02, 0.42, 0.33]],
	['Ah, queima, ', ['ah', 'quei', 'ma'], [0.53, 0.47, 0.0]],
	['tão logo ao toque, ', ['tão', 'lo', 'go', 'ao', 'to', 'que'], [0.09, 0.34, 0.06, 0.21, 0.22, 0.08]],
	['fineto o véu: ', ['fi', 'ne', 'to', 'o', 'véu:'], [0.0, 0.27, 0.34, 0.11, 0.28]],
	['à separar-se.', ['à', 'se', 'pa', 'rar'], [0.22, 0.38, 0.07, 0.33]],
	['No que ao firmar, ', ['no', 'que', 'ao', 'fir', 'mar'], [0.03, 0.42, 0.01, 0.32, 0.22]],
	['ao separar-se: ', ['ao', 'se', 'pa', 'rar', 'se:'], [0.26, 0.24, 0.09, 0.18, 0.23]],
	['rubro vermelho sangue,', ['ru', 'bro', 'ver', 'me', 'lho', 'san', 'gue'], [0.25, 0.02, 0.08, 0.14, 0.1, 0.25, 0.16]],
	["Marc'o caminho que rastejar-se.", ["marc'o", 'ca', 'mi', 'nho', 'que', 'ras', 'te', 'jar', 'se'], [0.15, 0.09, 0.12, 0.17, 0.22, 0.04, 0.0, 0.01, 0.2]],
	['Ah! ', ['ah'], [1.0]],
	['Sorve o astro tais qualidades, ', ['sor', 've', 'o', 'as', 'tro', 'tais', 'qua', 'li', 'da', 'des'], [0.03, 0.2, 0.2, 0.01, 0.07, 0.07, 0.15, 0.16, 0.1, 0.01]],
	['do peito homem:', ['do', 'pei', 'to', 'ho', 'mem:'], [0.28, 0.12, 0.23, 0.14, 0.23]],
	['Sais à provocar-lhe, ', ['sais', 'à', 'pro', 'vo', 'car', 'lhe'], [0.21, 0.11, 0.17, 0.13, 0.12, 0.26]],
	['conclama à Deus rependimentos', ['con', 'cla', 'ma', 'à', 'deus', 're', 'pen', 'di', 'men', 'tos'], [0.02, 0.1, 0.05, 0.09, 0.21, 0.13, 0.09, 0.15, 0.14, 0.02]],
	['Ah - diz', ['ah', 'diz'], [0.4, 0.6]],
	['Deixe-me ao útero de mais uma vez: ', ['dei', 'xe', 'me', 'ao', 'úte', 'ro', 'de', 'mais', 'uma', 'vez:'], [0.02, 0.03, 0.07, 0.12, 0.17, 0.12, 0.09, 0.05, 0.16, 0.17]],
	['tornar-te.', ['tor', 'nar', 'te'], [0.31, 0.55, 0.14]],
];

const SOBRE_A_AREIA_NORMAL = [
	['Percebendo-se de carne armadura, ', ['per', 'ce', 'ben', 'do', 'se', 'de', 'car', 'ne', 'ar', 'ma', 'du', 'ra'], [0.03, 0.13, 0.14, 0.02, 0.1, 0.1, 0.11, 0.11, 0.08, 0.05, 0.02, 0.11]],
	['mais uma vez tocaram-se', ['mais', 'uma', 'vez', 'to', 'ca', 'ram', 'se'], [0.0, 0.09, 0.1, 0.08, 0.27, 0.23, 0.23]],
	['Pois assim quis o altíssimo e era imperioso que o fizessem.', ['pois', 'as', 'sim', 'quis', 'o', 'al', 'tís', 'si', 'mo', 'e', 'era', 'im', 'pe', 'ri', 'so', 'que', 'fi', 'zes', 'sem'], [0.01, 0.06, 0.03, 0.02, 0.07, 0.04, 0.05, 0.03, 0.06, 0.06, 0.06, 0.09, 0.09, 0.02, 0.12, 0.01, 0.02, 0.04, 0.12]],
	['Pois assim, ', ['pois', 'as', 'sim'], [0.42, 0.14, 0.44]],
	['ao lento sangue: ', ['ao', 'len', 'to', 'san', 'gue:'], [0.12, 0.41, 0.14, 0.16, 0.17]],
	['pulsar-te-ei, ', ['pul', 'sar', 'te', 'ei'], [0.0, 0.44, 0.26, 0.3]],
	['que ao primeiro toque permuta.', ['que', 'ao', 'pri', 'mei', 'ro', 'to', 'per', 'mu', 'ta'], [0.18, 0.16, 0.16, 0.08, 0.09, 0.1, 0.05, 0.01, 0.17]],
	["Permuta o tempo todas su'horas, ", ['per', 'mu', 'ta', 'o', 'tem', 'po', 'to', 'das', "su'ho", 'ras'], [0.1, 0.12, 0.1, 0.2, 0.03, 0.15, 0.1, 0.04, 0.09, 0.07]],
	['gritando pare que aqui, ', ['gri', 'tan', 'do', 'pa', 're', 'que', 'aqui'], [0.15, 0.12, 0.15, 0.23, 0.15, 0.2, 0.0]],
	['aqui o deixe.', ['aqui', 'o', 'dei', 'xe'], [0.21, 0.51, 0.24, 0.04]],
	['Assim, ', ['as', 'sim'], [0.91, 0.09]],
	['dizem os amantes, ', ['di', 'zem', 'os', 'aman', 'tes'], [0.36, 0.12, 0.07, 0.44, 0.01]],
	['no pulular do tempo, ', ['no', 'pu', 'lu', 'lar', 'do', 'tem', 'po'], [0.2, 0.11, 0.06, 0.03, 0.05, 0.3, 0.25]],
	['das estrelas e da desesperança:', ['das', 'es', 'tre', 'las', 'e', 'da', 'de', 'ses', 'pe', 'ran', 'ça:'], [0.07, 0.13, 0.0, 0.01, 0.18, 0.12, 0.05, 0.04, 0.09, 0.15, 0.16]],
	['Adão... Adão... Eu te amo. ', ['adão', 'eu', 'te', 'amo'], [0.34, 0.02, 0.36, 0.28]],
	['Como era imperioso que o fizesse.', ['co', 'mo', 'era', 'im', 'pe', 'ri', 'o', 'so', 'que', 'fi', 'zes', 'se'], [0.08, 0.03, 0.03, 0.13, 0.05, 0.07, 0.1, 0.02, 0.1, 0.14, 0.17, 0.08]],
	['Eva... Eva... Eu te amo. ', ['eva', 'eu', 'te', 'amo'], [0.34, 0.18, 0.34, 0.14]],
	['Como era imperioso que o fizesse.', ['co', 'mo', 'era', 'im', 'pe', 'ri', 'o', 'so', 'que', 'fi', 'zes', 'se'], [0.12, 0.09, 0.18, 0.11, 0.08, 0.15, 0.02, 0.06, 0.02, 0.04, 0.11, 0.02]],
];

const VEEM_ADAO_EVA_NORMAL = [
	['No colorido do tempo saber-se-ia dos desígnios de Cronos', ['no', 'co', 'lo', 'ri', 'do', 'tem', 'po', 'sa', 'ber', 'se', 'ia', 'dos', 'de', 'síg', 'nios', 'cro', 'nos'], [0.08, 0.07, 0.02, 0.05, 0.08, 0.02, 0.1, 0.05, 0.05, 0.04, 0.09, 0.03, 0.05, 0.12, 0.1, 0.05, 0.0]],
	['e sua ilícita atividade', ['e', 'sua', 'ilí', 'ci', 'ta', 'ati', 'vi', 'da', 'de'], [0.15, 0.04, 0.12, 0.06, 0.12, 0.16, 0.1, 0.16, 0.09]],
	['Pois que ambos um só viram do farfalhar das asas parar o movimento.', ['pois', 'que', 'am', 'bos', 'um', 'só', 'vi', 'ram', 'do', 'far', 'fa', 'lhar', 'das', 'asas', 'pa', 'rar', 'o', 'mo', 'men', 'to'], [0.07, 0.0, 0.1, 0.1, 0.03, 0.07, 0.03, 0.05, 0.06, 0.0, 0.08, 0.09, 0.08, 0.1, 0.0, 0.02, 0.04, 0.01, 0.07, 0.0]],
	['Caía do céu pássaro que outrora voa,', ['ca', 'ía', 'do', 'céu', 'pás', 'sa', 'ro', 'que', 'ou', 'tro', 'ra', 'voa'], [0.06, 0.14, 0.15, 0.03, 0.03, 0.08, 0.13, 0.11, 0.07, 0.1, 0.05, 0.05]],
	['canta,', ['can', 'ta'], [0.24, 0.76]],
	['e dos verdejantes vivos espalha sêmem e bem aventurança.', ['e', 'dos', 'ver', 'de', 'jan', 'tes', 'vi', 'vos', 'es', 'pa', 'lha', 'sê', 'mem', 'bem', 'aven', 'tu', 'ran', 'ça'], [0.1, 0.0, 0.07, 0.09, 0.1, 0.04, 0.0, 0.01, 0.08, 0.02, 0.06, 0.04, 0.1, 0.09, 0.1, 0.05, 0.02, 0.03]],
	['Sangra a escuridão das horas,', ['san', 'gra', 'a', 'es', 'cu', 'ri', 'dão', 'das', 'ho', 'ras'], [0.05, 0.12, 0.12, 0.03, 0.11, 0.12, 0.12, 0.15, 0.13, 0.05]],
	['do mundo e sua impaciência,', ['do', 'mun', 'e', 'sua', 'im', 'pa', 'ciên', 'cia'], [0.23, 0.09, 0.13, 0.05, 0.05, 0.15, 0.15, 0.15]],
	['Que nas inadequações da vida o homem encontra resistência e pranto seu próprio.', ['que', 'nas', 'ina', 'de', 'qua', 'ções', 'da', 'vi', 'o', 'ho', 'mem', 'en', 'con', 'tra', 're', 'sis', 'tên', 'cia', 'e', 'pran', 'to', 'seu', 'pró', 'prio'], [0.03, 0.0, 0.03, 0.09, 0.06, 0.05, 0.0, 0.0, 0.03, 0.08, 0.1, 0.0, 0.08, 0.0, 0.02, 0.08, 0.06, 0.05, 0.1, 0.06, 0.01, 0.01, 0.04, 0.02]],
	['Assim quis o senhor:', ['as', 'sim', 'quis', 'o', 'se', 'nhor:'], [0.03, 0.19, 0.09, 0.27, 0.17, 0.25]],
	['Fome, males, a dor do mundo.', ['fo', 'me', 'ma', 'les', 'a', 'dor', 'do', 'mun'], [0.08, 0.11, 0.18, 0.15, 0.1, 0.13, 0.17, 0.08]],
	['Conquanto tente não se resolve,', ['con', 'quan', 'to', 'ten', 'te', 'não', 'se', 're', 'sol', 've'], [0.19, 0.13, 0.04, 0.0, 0.15, 0.02, 0.21, 0.15, 0.04, 0.07]],
	['e o sentido, qual é?', ['e', 'o', 'sen', 'ti', 'do', 'qual', 'é'], [0.06, 0.26, 0.01, 0.07, 0.22, 0.25, 0.13]],
	['O corpo:', ['o', 'cor', 'po:'], [0.74, 0.16, 0.1]],
	['Aquilo que eres máquina de se existires trará-te-a dores extremas', ['aqui', 'lo', 'que', 'eres', 'má', 'qui', 'na', 'de', 'se', 'exis', 'ti', 'res', 'tra', 'rá', 'te', 'a', 'do', 'ex', 'tre', 'mas'], [0.0, 0.05, 0.02, 0.04, 0.01, 0.09, 0.0, 0.1, 0.01, 0.1, 0.06, 0.01, 0.01, 0.09, 0.04, 0.1, 0.05, 0.03, 0.08, 0.11]],
	['De criaturas,', ['de', 'cri', 'a', 'tu', 'ras'], [0.24, 0.16, 0.11, 0.45, 0.04]],
	['também que existem,', ['tam', 'bém', 'que', 'exis', 'tem'], [0.15, 0.18, 0.53, 0.05, 0.09]],
	['sois invisivéis,', ['sois', 'in', 'vi', 'si', 'véis'], [0.39, 0.23, 0.21, 0.13, 0.04]],
	['males.', ['ma', 'les'], [0.07, 0.93]],
	['Não só do externo sofr’este o homem,', ['não', 'só', 'do', 'ex', 'ter', 'no', 'so', 'fr’es', 'te', 'o', 'ho', 'mem'], [0.09, 0.04, 0.12, 0.09, 0.11, 0.06, 0.12, 0.01, 0.11, 0.11, 0.03, 0.11]],
	['tal qual doença grita o corpo:', ['tal', 'qual', 'do', 'en', 'ça', 'gri', 'ta', 'o', 'cor', 'po:'], [0.2, 0.04, 0.01, 0.09, 0.05, 0.16, 0.05, 0.21, 0.16, 0.03]],
	['Náuseas, cansaço, dores e acabamento. ', ['náu', 'seas', 'can', 'sa', 'ço', 'do', 'res', 'e', 'aca', 'ba', 'men', 'to'], [0.05, 0.02, 0.08, 0.19, 0.02, 0.06, 0.05, 0.18, 0.07, 0.04, 0.18, 0.06]],
	['Grita.', ['gri', 'ta'], [0.62, 0.38]],
	['A alma:', ['a', 'al', 'ma:'], [0.11, 0.76, 0.13]],
	["D'alma cansada sofreste o espírito, ", ["d'al", 'ma', 'can', 'sa', 'da', 'so', 'fres', 'te', 'o', 'es', 'pí', 'ri', 'to'], [0.02, 0.09, 0.05, 0.08, 0.11, 0.1, 0.06, 0.07, 0.1, 0.1, 0.11, 0.04, 0.07]],
	['no amanhã,', ['no', 'ama', 'nhã'], [0.58, 0.19, 0.23]],
	['outro amanhã.', ['ou', 'tro', 'ama', 'nhã'], [0.62, 0.0, 0.2, 0.18]],
	['Como este em piche perde as vontades, ', ['co', 'mo', 'es', 'te', 'em', 'pi', 'che', 'per', 'de', 'as', 'von', 'ta', 'des'], [0.16, 0.1, 0.08, 0.12, 0.13, 0.08, 0.01, 0.11, 0.14, 0.02, 0.0, 0.03, 0.02]],
	['caminha abaixo sê sim naufrágio.', ['ca', 'mi', 'nha', 'abai', 'xo', 'sê', 'sim', 'nau', 'frá', 'gio'], [0.19, 0.2, 0.1, 0.08, 0.16, 0.04, 0.14, 0.01, 0.07, 0.01]],
	['Perpétua languidez:', ['per', 'pé', 'tua', 'lan', 'gui', 'dez:'], [0.23, 0.13, 0.26, 0.16, 0.02, 0.2]],
	['tão logo falta,', ['tão', 'lo', 'go', 'fal', 'ta'], [0.19, 0.23, 0.21, 0.34, 0.03]],
	['em vida: significado.', ['em', 'vi', 'da:', 'sig', 'ni', 'fi', 'ca', 'do'], [0.11, 0.11, 0.01, 0.05, 0.04, 0.21, 0.3, 0.17]],
];

var POEMAS = [ADAO_NORMAL, LAMENTACAO_NORMAL, CAMINHAM_NO_DESERTO_NORMAL, SOBRE_A_AREIA_NORMAL, VEEM_ADAO_EVA_NORMAL];

var allNotes = {};
function preload() {
	// load all images inside ./figs/*.png
	var noteNames = ['a', 'a-', 'as', 'b', 'b-', 'bs', 'c', 'c-', 'cs', 'd', 'd-', 'ds', 'e', 'e-', 'es', 'f', 'f-', 'fs', 'g', 'g-', 'gs'];
	var noteOctaves = ['3', '4', '5'];
	for (var i = 0; i < noteNames.length; i++) {
		for (var j = 0; j < noteOctaves.length; j++) {
			var noteName = noteNames[i];
			var noteOctave = noteOctaves[j];
			var noteFilename = './figs/' + noteName + noteOctave + '.png';
			allNotes[noteFilename] = loadImage(noteFilename, success, failure);
		}
	}
}

function success(_) {}

function failure(event) {
	console.error('Oops!', event);
}

function setup() {
	let pageWidth = window.innerWidth - 20;
	let pageHeight = window.innerHeight - 20;
	let myCanvas = createCanvas(pageWidth, pageHeight);
	myCanvas.parent('mySketch');
	background(255);
	x1 = constrain(100, 0, width);
	y1 = constrain(100, 0, height);
	nombre = 0;
	f = loadFont('NewTegomin-Regular.ttf');
	textFont(f);
	textAlign(CENTER, CENTER);
	str = random(VEEM_ADAO_EVA_NORMAL)[0];
	frameCountValue = parseInt(random(10, 30));
}

var fpsToNextSyllable = 0;
var fpsThisSyllable = 0;
var PART_LETTER = '';

function removeImage(x1, y1) {
	fill(255);
	noStroke();
	rect(x1 - 20, y1 - 20, 400, 400);
}

let probA_ClearCanvas = 0.01;
let probA_X_posValues = [15, 20];
let probA_Y_posValues = [-5, 5];

function partA() {
	if (x1 < window.innerWidth - 100) {
		x1 = x1 + random(probA_X_posValues[0], probA_X_posValues[1]);
		y1 = y1 + random(probA_Y_posValues[0], probA_Y_posValues[1]);
	} else {
		x1 = 100;
		y1 = y1 + 200;
	}
	fill(0);
	textSize(random(10, 20));
	if (nombre < str.length) {
		let lletra = str.charAt(nombre);
		if (lletra === ' ') {
			x1 = random(0, window.innerWidth - 300);
			y1 = random(0, window.innerHeight - 300);
			lletra = '     ';
			let POEMA = random(POEMAS);
			str = random(POEMA)[0];
		}
		text(lletra, x1, y1);
		nombre++;
	} else {
		let POEMA = random(POEMAS);
		str = random(POEMA)[0];
		nombre = 0;
	}

	if (x1 > width) {
		x1 = 100;
		y1 = y1 + 200;
	}
	if (y1 > height) {
		x1 = 100;
		y1 = 100;
	}

	let randomNote = random(0, 1000) * 0.001;
	if (randomNote > probA_ClearCanvas) {
		// background(255);
		if (probA_ClearCanvas > 0.99) {
			probA_ClearCanvas -= probA_ClearCanvas * 0.01;
		} else {
			probA_ClearCanvas += probA_ClearCanvas * 0.01;
			probA_X_posValues = [probA_X_posValues[0] * 0.99999, probA_X_posValues[1] * 0.999999];
			probA_Y_posValues = [probA_Y_posValues[0] * 0.99999, probA_Y_posValues[1] * 0.999999];
			// console.log(probA_X_posValues, probA_Y_posValues);
		}
		// console.log(probA_ClearCanvas);
	}

	randomNote = random(0, 1000) * 0.001;
	if (randomNote > 0.98) {
		var div = document.createElement('div', 'image-container');
		div.style.position = 'absolute';
		div.style.left = x1 + 'px';
		div.style.top = y1 + 'px';
		div.style.width = '200px';
		div.style.height = '200px';
		div.style.background = 'white';
		div.style.zIndex = 1000;
		div.style.pointerEvents = 'none';
		div.style.borderRadius = '10px';
		div.style.boxShadow = '0px 0px 10px 10px rgba(0,0,0,0.15)';
		let img = document.createElement('img');
		let process1 = window.pd4webGuiValues['ui_process1note'];
		let process2 = window.pd4webGuiValues['ui_process2note'];
		let processNote = random([process1, process2]);
		processNote = processNote.toLowerCase();
		processNote = processNote.replace('#', 's');
		img.src = './figs/' + processNote + '.png';
		img.id = 'your-image';
		img.style.width = '100%';
		img.style.height = '100%';
		img.style.objectFit = 'cover';
		img.style.borderRadius = '10px';
		img.style.clipPath = 'inset(3px 3px 3px 3px)';
		div.appendChild(img);
		document.body.appendChild(div);
		setTimeout(function () {
			div.classList.add('fade-in');
		}, 1000);
		setTimeout(() => {
			div.remove();
		}, 4000);
	}
}

function partB() {
	background(255);
	PART_LETTER = 'B';
}

function partC() {
	if (x1 < window.innerWidth - 100) {
		x1 = x1 + random(15, 20);
		y1 = y1 + random(-5, 5);
	} else {
		x1 = 100;
		y1 = y1 + 200;
	}
	fill(0);
	textSize(random(10, 20));
	if (nombre < str.length) {
		let lletra = str.charAt(nombre);
		if (lletra === ' ') {
			lletra = '     ';
			let POEMA = random(POEMAS);
			str = random(POEMA)[0];
		}
		text(lletra, x1, y1);
		nombre++;
	} else {
		let POEMA = random(POEMAS);
		str = random(POEMA)[0];
		nombre = 0;
	}

	if (x1 > width) {
		x1 = 100;
		y1 = y1 + 200;
	}
	if (y1 > height) {
		x1 = 100;
		y1 = 100;
	}

	let randomNote = random(0, 1000) * 0.001;
	if (randomNote > 0.99) {
		let note = allNotes[Object.keys(allNotes)[parseInt(random(0, Object.keys(allNotes).length))]];
		let noteWidth = note.width;
		let noteHeight = note.height;
		image(note, x1 % noteWidth, y1 % noteHeight, 300, 300);
		setTimeout(removeImage, 4000, x1 % noteWidth, y1 % noteHeight);
	}
}

function draw() {
	let thisFrameMod = frameCount % frameCountValue;
	if (thisFrameMod == 0) {
		frameCountValue = parseInt(random(5, 10));
	} else {
		return;
	}
	if (PART_LETTER === 'A') {
		partA();
	}
	if (PART_LETTER === 'B') {
		partB();
	}
}

function keyPressed() {
	if (key === 'A' || key === 'a') {
		PART_LETTER = 'A';
		notaParaGesto = 1;
		// sendFloat('pressedkey', 1);
	}
	if (key === 'B' || key === 'b') {
		PART_LETTER = 'B';
		notaParaGesto = 0.99;
		// sendFloat('pressedkey', 2);
	}
}
