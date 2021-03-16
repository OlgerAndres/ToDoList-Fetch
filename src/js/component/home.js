import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	const [task, setTask] = useState("");
	const [check, setCheck] = useState(false);
	const [list, setList] = useState([]);

	//Url del Api y el  /user
	var url = "https://assets.breatheco.de/apis/fake/todos/user/OlgerAndres";

	const Cargar = () => {
		fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				setList(data);
				//carga la data
			})
			.catch(error => console.error("Error:", error.message));
	};

	const Nuevo = () => {
		let array = [];
		fetch(url, {
			method: "POST",
			body: JSON.stringify(array),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				Cargar();
			})
			.catch(error => console.error("Error:", error.message));
	};

	const Actualizar = lista => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(lista),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				Cargar();
				alert(data.result);
			}) 
			.catch(error => console.error("Error:", error.message));
	};

	const Borrar = () => {
		fetch(url, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				Nuevo();
				alert(data.result);
			})
			.catch(error => console.error("Error:", error.message));
	};

	useEffect(() => {
		Cargar();
	}, []);

	return (
		<div className="container mt-5 text-center">
			<div className="row d-flex justify-content-center">
				<div className="col-md-10">
					<div className="card">
						<h1 className="display-5">Listar Tareas</h1>
						<div className="card-header">
							<div className="row mt-4">
								<div className="col-sm-8 pb-3">
									<label>Tarea</label>
									<input
										className="form-control"
										type="text"
										value={task}
										onChange={e => {
											setTask(e.target.value);
										}}
									/>
								</div>

								<div className="col-sm-3 pb-3 d-flex align-items-end">
									<button
										type="button"
										className="form-control btn btn-primary"
										onClick={() => {
											let obj = {
												label: task,
												done: check
											};
											setList(list.concat(obj));
											setCheck(false);
											setTask("");
										}}>
										Agregar Tareas
									</button>
								</div>
							</div>
						</div>
						<div className="card-body text-primary">
							{!list
								? "loading..."
								: list.map((item, index) => {
										return (
											<label
												className="form-control text-left px-5"
												key={index}>
												{item.label}
											</label>
										);
								  })}
						</div>
					</div>
				</div>
			</div>
			<div className="row d-flex justify-content-center">
				<button
					type="button"
					className="btn btn-outline-success"
					onClick={() => {
						Actualizar(list);
					}}>
					Actualizar
				</button>
				<button
					type="button"
					className="btn btn-outline-danger"
					onClick={() => {
						Borrar();
					}}>
					Borrar
				</button>
			</div>
		</div>
	);
}
