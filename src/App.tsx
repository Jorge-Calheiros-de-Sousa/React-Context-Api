import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useNotification from "./hooks/useNotification";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [seconds, setSeconds] = useState(0);
  const notify = useNotification();

  const clearStates = () => {
    setTitle("");
    setDescription("");
    setSeconds(0);
  }

  const handleClick = (e: any) => {
    const id = e.target.id;
    const data: any = {
      title: title,
      description: description
    }

    if (!title) {
      return;
    }

    if (seconds > 0) {
      data.timeout = seconds * 1000;
    }

    if (id == "success") {
      notify.success(data);
    } else if (id == "danger") {
      notify.danger(data)
    } else if (id == "warning") {
      notify.warning(data)
    } else if (id == "info") {
      notify.info(data)
    } else {
      return;
    }
    clearStates();
  }

  return (
    <div className="container">
      <h1>Notificações</h1>
      <Form className="row mb-3">
        <Form.Group className="col">
          <Form.Label>Titulo da notificação</Form.Label>
          <Form.Control placeholder="Digite o titulo da notificação" value={title} onChange={(e) => { setTitle(e.target.value) }} />
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>Descrição da notificação</Form.Label>
          <Form.Control placeholder="Digite a descrição da notificação" value={description} onChange={(e) => { setDescription(e.target.value) }} />
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>Duração</Form.Label>
          <Form.Select onChange={(e) => { setSeconds(parseInt(e.target.value)) }}>
            <option value={0} selected>Permanente</option>
            <option value={1}>1 Segundo</option>
            <option value={2}>2 Segundos</option>
            <option value={3}>3 Segundos</option>
            <option value={4}>4 Segundos</option>
            <option value={5}>5 Segundos</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <div className="container">
        <div className="row" style={{
          gap: 5
        }}>
          <Button variant="success" id="success" className="col" onClick={handleClick}>Abrir uma notificação de sucesso</Button>
          <Button variant="danger" id="danger" className="col" onClick={handleClick}>Abrir uma notificação de erro</Button>
          <Button variant="info" id="info" className="col" onClick={handleClick}>Abrir uma notificação de info</Button>
          <Button variant="warning" id="warning" className="col" onClick={handleClick}>Abrir uma notificação warning</Button>
        </div>
      </div>
    </div>
  )
}

export default App
