<Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
  <Row className="clearfix">
    <Col sm={12}>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link eventKey="first">Tab 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second">Tab 2</Nav.Link>
        </Nav.Item>
        <NavDropdown eventKey="3" title="Dropdown" id="nav-dropdown-within-tab">
          <Dropdown.Item eventKey="3.1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="3.2">Another action</Dropdown.Item>
          <Dropdown.Item eventKey="3.3">Something else here</Dropdown.Item>
          <Dropdown.Item divider />
          <Dropdown.Item eventKey="3.4">Separated link</Dropdown.Item>
        </NavDropdown>
      </Nav>
    </Col>
    <Col sm={12}>
      <Tab.Content animation>
        <Tab.Pane eventKey="first">Tab 1 content</Tab.Pane>
        <Tab.Pane eventKey="second">Tab 2 content</Tab.Pane>
        <Tab.Pane eventKey="3.1">Tab 3.1 content</Tab.Pane>
        <Tab.Pane eventKey="3.2">Tab 3.2 content</Tab.Pane>
        <Tab.Pane eventKey="3.3">Tab 3.3 content</Tab.Pane>
        <Tab.Pane eventKey="3.4">Tab 3.4 content</Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
</Tab.Container>;
