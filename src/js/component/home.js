import React, { useState, useRef, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [songList, setSongList] = useState([]);
	const [color, setColor] = useState([]);
	const [icono, setIcono] = useState(true);
	const [posActual, setPosActual] = useState(0);

	const obtenerCanciones = async () => {
		try {
			const res = await fetch(
				"https://assets.breatheco.de/apis/sound/songs"
			);
			const data = await res.json();
			//console.log(data);
			setSongList(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		obtenerCanciones();
	}, []);

	let cancion = useRef();
	const items = songList.map((element, id) => (
		<tr className={color[id]} key={id} onClick={() => cambiarCancion(id)}>
			<th scope="row">{element.id}</th>
			<td>{element.name}</td>
		</tr>
	));

	const cambiarCancion = pos => {
		//si está en 0 no cambia, tampoco al final del array
		if (pos < 0) {
			pos = 0;
		} else if (pos >= songList.length) {
			pos = 0;
		}

		//cambiar color del seleccionado
		let arr = [];
		arr[pos] = "active";
		setColor(arr);

		cancion.current.src =
			"https://assets.breatheco.de/apis/sound/" + songList[pos].url;
		cancion.current.play();
		setIcono(false);
		setPosActual(pos);
	};

	const playPausa = () => {
		if (cancion.current.paused) {
			cancion.current.play();
			setIcono(false);
		} else if (!cancion.current.paused) {
			cancion.current.pause();
			setIcono(true);
		}
	};

	return (
		<div>
			<table className="table table-dark">
				<tbody>{items}</tbody>
			</table>
			<audio ref={cancion} src="" />
			<br></br>

			<nav className="navbar fixed-bottom d-flex justify-content-center ">
				<div className="navbar-brand mb-0 h1">
					<i
						className="fas fa-step-backward mr-2"
						onClick={() => cambiarCancion(posActual - 1)}></i>
					<i
						className={icono ? "fas fa-play" : "fas fa-pause"}
						onClick={() => playPausa()}></i>
					<i
						className="fas fa-step-forward ml-2"
						onClick={() => cambiarCancion(posActual + 1)}></i>
				</div>
			</nav>
		</div>
	);
}
