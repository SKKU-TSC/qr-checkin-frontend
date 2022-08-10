import axios from 'axios';

export default async function voiceTTS(text) {
    axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
	const response = await axios.post(
		`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_GOOGLE_APPLICATION_CREDENTIALS}`,
		{
			input: {
				text: text,
			},
			voice: {
				languageCode: 'ko-KR',
				ssmlGender: 'FEMALE',
			},
			audioConfig: {
				audioEncoding: 'LINEAR16',
				speakingRate: 1,
			},
        }, {
            headers: {
                
            }
        }
	);

	console.log(response);
	// Write the binary audio content to a local file
	const newAudio = new Audio(
		'data:audio/wav;base64,' + response.data?.audioContent
	);

	newAudio.play();
}
