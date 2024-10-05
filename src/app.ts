// auto bind ddecorator

function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// ProjectInout class
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

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElemet.value;
    const enteredDescription = this.descriptionInputElemet.value;
    const enteredPeople = this.peopleInputElemet.value;

    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredPeople.trim().length === 0
    ) {
      alert("invali input! please try again ");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElemet.value = "";
    this.descriptionInputElemet.value = "";
    this.peopleInputElemet.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();

    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title);
      console.log(description);
      console.log(people);
    }
    this.clearInputs();
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
