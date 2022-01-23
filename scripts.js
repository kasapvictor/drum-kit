window.onload = () => {
	keysInit ();
}

const UIKeys = {
	wrap: document.querySelector ( '.keys' ),
	isDown: true,
	sound: {
		a: new Audio ( './sounds/clap.wav' ),
		s: new Audio ( './sounds/hihat.wav' ),
		d: new Audio ( './sounds/kick.wav' ),
		f: new Audio ( './sounds/openhat.wav' ),
		g: new Audio ( './sounds/boom.wav' ),
		h: new Audio ( './sounds/ride.wav' ),
		j: new Audio ( './sounds/snare.wav' ),
		k: new Audio ( './sounds/tom.wav' ),
		l: new Audio ( './sounds/tink.wav' ),
	}
}

// инициализация событий
function keysInit () {
	// события мыши
	keyMouseEvents ();

	// события клавиатуры
	keyKeyboardEvents ();
}

/**
 * Функция слушает событие клик на блоке keys
 * Через делегирование события
 */
function keyMouseEvents () {
	UIKeys.wrap.addEventListener ( 'click', ( e ) => {
		const el = e.target;
		const isKey = el.closest ( '.key' );

		if ( isKey ) {
			const soundName = UIKeys.sound[`${ isKey.dataset.key }`];
			if ( soundName ) {
				playSound ( soundName );
			}
		}
	} );
}

/**
 * События нажатий клавиш клавиатуры
 */
function keyKeyboardEvents () {
	window.addEventListener ( 'keydown', ( e ) => {
		const soundName = UIKeys.sound[`${ e.key }`];

		UIKeys.isDown = !e.repeat;

		if ( UIKeys.isDown && soundName ) {
			playSound ( soundName );
			switchActiveKay ( e.key );
		}
	} );
}

/**
 * Функция получает название звука
 * Вызывает метод play() у объекта Audio
 * @param soundName
 */
function playSound ( soundName ) {
	soundName.currentTime = 0;
	soundName.play ();
}

/**
 * Функция переключает активный класс у клавиш
 */
function switchActiveKay ( symbol ) {
	const el = UIKeys.wrap.querySelector ( `[data-key=${ symbol }]` );

	// добавляем класс
	el.classList.add ( 'active' );

	// удаляем класс через .3 секунды
	setTimeout ( () => {
		el.classList.remove ( 'active' );
	}, 300 );
}



