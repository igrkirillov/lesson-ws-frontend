export default class Ticket {
  constructor(id, name, status, description, created) {
    this.id = id || null; // идентификатор (уникальный в пределах системы)
    this.name = name || ""; // краткое описание
    this.status = status || false; // boolean - сделано или нет
    this.description = description || ""; // полное описание
    this.created = created || Date.now(); // дата создания (timestamp)
  }

  clone() {
    return new Ticket(
      this.id,
      this.name,
      this.status,
      this.description,
      this.created
    );
  }
}
