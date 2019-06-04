<template>
  <Card>
    <div>
      <Button type="primary" @click="threadPoxi()" icon="plus">发送消息</Button>
    </div>
  </Card>
</template>
<script>
  
  export default {
    name: 'testwebsocket',
    data() {
      return {
        websocket: null
      }
    },
    methods: {
      threadPoxi() {
        // 实际调用的方法 如果ws已经连接则直接发送消息；如正在开启状态，则等待300毫秒，再发送消息；若未开启 ，则等待500毫秒，再发送消息。
        // 参数
        const agentData = '从前台发出的信息'
        // 若是ws开启状态
        if (this.websocket.readyState === this.websocket.OPEN) {
          this.websocketsend(agentData)
        } else if (this.websocket.readyState === this.websocket.CONNECTING) {
          // 若是 正在开启状态，则等待300毫秒
          const that = this
          // 保存当前对象this
          setTimeout(function() {
            that.websocketsend(agentData)
          }, 300)
        } else {
          // 若未开启 ，则等待500毫秒
          this.initWs()
          const that = this
          // 保存当前对象this
          setTimeout(function() {
            that.websocketsend(agentData)
          }, 500)
        }
      },
      initWs() {
        if ('WebSocket' in window) {
          this.websocket = new WebSocket('ws://localhost:8089/项目名/ws')
        } else {
          alert('Sorry, websocket not supported by your browser.')
        }
        // 数据接收
        this.websocket.onmessage = this.websocketonmessage
        /*
        this.websocket.onclose = this.websocketclose; */
        // this.websocket.close();
      },
      websocketonmessage(e) {
        // 数据接收
        console.log('Client received a message', e.data)
      },
      websocketsend(agentData) {
        // 数据发送
        this.websocket.send(agentData)
      },
      websocketclose(e) {
        // 关闭
        this.websocket.close()
        console.log('connection closed (' + e.code + ')')
      }
    },
    created() {
      this.initWs()
    }
  }
</script>
