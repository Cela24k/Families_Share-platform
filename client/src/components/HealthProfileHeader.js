class ChildProfileHeader extends React.Component {
  render() {
      return (
        <React.Fragment>
        </React.Fragment>

      )
  }
}

HealthProfileHeader.propTypes = {
    background: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string,
    match: PropTypes.object,
    history: PropTypes.object,
    language: PropTypes.string
  };

export default withRouter(withLanguage(HealthProfileHeader));
