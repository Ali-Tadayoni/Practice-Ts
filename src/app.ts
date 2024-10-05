class ProjectInput {
  tempelateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElemet: HTMLInputElement;
  descriptionInputElemet: HTMLInputElement;
  peopleInputElemet: HTMLInputElement;
  constructor() {
    this.tempelateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.tempelateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputElemet = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElemet = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElemet = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElemet.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
