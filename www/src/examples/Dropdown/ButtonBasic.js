function renderDropdownButton(title, i) {
  return (
    <DropdownButton
      key={i}
      title={title}
      variant={title.toLowerCase()}
      id={`dropdown-basic-${i}`}
    >
      <Dropdown.Item eventKey="1">Action</Dropdown.Item>
      <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
      <Dropdown.Item eventKey="3" active>
        Active Item
      </Dropdown.Item>
      <Dropdown.Item divider />
      <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
    </DropdownButton>
  );
}

const buttonsInstance = (
  <ButtonToolbar>
    {['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger'].map(
      renderDropdownButton
    )}
  </ButtonToolbar>
);

render(buttonsInstance);
