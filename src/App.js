import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {
  List, message, Avatar, Spin,
} from 'antd';
import { Calendar, Badge } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';



class App extends React.Component {
  state = {
    date: null,
    data: ["Coding 101 Workshop", "English for Intermediate Students","Arduino and Soldering Workshop", "Writing an Essay 101", ],
    loading: false,
    hasMore: true,
  }

  handleChange = date => {
    message.info(`Selected Date: ${date ? date.format("YYYY-MM-DD") : "None"}`);
    this.setState({ date });

    if (date = 2019-5-23){
      this.setState(data => {
       
        return {
          data,
        };
      });
    }
  };


  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  }



  render() {
    const { date } = this.state;
    return (
      <div className="demo-infinite-container">

      <div id="calendar" style={{ width: 700, margin: "100px auto" }}>
              <Calendar onChange={this.handleChange} />
              <div style={{ marginTop: 20 }}>
                Selected Date: {date ? date.format("YYYY-MM-DD") : "None"}
              </div>
            </div>
            <div id="eventlist" style={{ width: 700, margin: "100px auto"}}>
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={false}
              >
                <List
                  dataSource={this.state.data}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={<Avatar src="https://clipart.wpblink.com/sites/default/files/wallpaper/calendar-icons/446793/calendar-icons-color-446793-2833622.png" />}
                        title={<a href="https://ant.design">{item}</a>}
                        description={item.email}
                      />
                      <div>Content</div>
                    </List.Item>
                  )}
                >
                  {this.state.loading && this.state.hasMore && (
                    <div className="demo-loading-container">
                      <Spin />
                    </div>
                  )}
                </List>
              </InfiniteScroll>
            </div>
            </div>
    );
  }
}

export default App