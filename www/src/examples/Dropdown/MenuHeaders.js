function onSelectAlert(eventKey) {
  alert(`Alert from menu item.\neventKey: ${eventKey}`);
}

const Dropdown.Items = (
  <Clearfix>
    <ul className="dropdown-menu open">
      <Dropdown.Item header>Header</Dropdown.Item>
      <Dropdown.Item>link</Dropdown.Item>
      <Dropdown.Item divider />
      <Dropdown.Item header>Header</Dropdown.Item>
      <Dropdown.Item>link</Dropdown.Item>
      <Dropdown.Item disabled>disabled</Dropdown.Item>
      <Dropdown.Item title="See? I have a title.">
        link with title
      </Dropdown.Item>
      <Dropdown.Item eventKey={1} href="#someHref" onSelect={onSelectAlert}>
        link that alerts
      </Dropdown.Item>
    </ul>
  </Clearfix>
);

render(Dropdown.Items);
