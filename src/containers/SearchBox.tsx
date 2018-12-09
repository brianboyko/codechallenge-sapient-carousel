import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { getPhotos, loadPhotos } from "../store/actions/photos";
import { testImages } from "../util/testImages";
import { pagePrev, pageNext } from "../store/actions/carousel";
import SearchQuery from "../components/SearchQuery";

interface IMainCarouselState {
  queryField: string;
}
export class MainCarousel extends React.Component<any, IMainCarouselState> {
  constructor(props: any) {
    super(props);
    this.state = { queryField: "" };
  }
  public render() {
    const { handleQueryChange, handleGetPhotos } = this;
    const { queryField } = this.state;
    return (
      <SearchQuery
        handleQueryChange={handleQueryChange}
        handleGetPhotos={handleGetPhotos}
        queryField={queryField}
      />
    );
  }
  private handleQueryChange = (event: any): void => {
    this.setState({ queryField: event.target.value });
  };
  private handleGetPhotos = (): void => {
    this.props.actions.getPhotos(this.state.queryField);
    this.setState({ queryField: "" });
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    getPhotos: bindActionCreators(
      (query: string) => getPhotos(query),
      dispatch
    ),
    loadMockData: bindActionCreators(() => loadPhotos(testImages), dispatch),
    pagePrev: bindActionCreators(pagePrev, dispatch),
    pageNext: bindActionCreators(pageNext, dispatch)
  }
});

export default connect(
  null,
  mapDispatchToProps
)(MainCarousel);