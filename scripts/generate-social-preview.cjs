// Run from the project root: node scripts/generate-social-preview.cjs
const { ImageResponse } = require('next/og');
const React = require('react');
const fs = require('node:fs');
const path = require('node:path');
const h = React.createElement;
const box = (style, ...children) => h('div', { style: { display: 'flex', ...style } }, ...children);
const portrait = `data:image/jpeg;base64,${fs.readFileSync(path.join(__dirname, '../public/hero.jpg')).toString('base64')}`;
const image = box({width:'100%',height:'100%',background:'#060d12',color:'#edf7fa',padding:'58px 64px',position:'relative',fontFamily:'sans-serif',overflow:'hidden'},
  box({position:'absolute',inset:0,backgroundImage:'radial-gradient(ellipse at 95% 10%, #12382e 0%, transparent 57%), radial-gradient(ellipse at 0% 100%, #102a3b 0%, transparent 55%)'}),
  box({position:'absolute',left:28,top:40,bottom:40,width:1,background:'#24564e'}),
  box({flexDirection:'column',width:700,position:'relative'},
    box({alignItems:'center',gap:16,marginBottom:30},
      h('img',{src:portrait,width:54,height:54,style:{borderRadius:27,objectFit:'cover',border:'1px solid #39756b'}}),
      box({flexDirection:'column',gap:6},
        box({fontSize:15,letterSpacing:3,color:'#6ee7b7'},'AI ENGINEER'),
        box({fontSize:14,color:'#8da9b3'},'Hyderabad, India'))),
    box({fontSize:79,fontWeight:700,letterSpacing:-4,lineHeight:1.02,flexDirection:'column'},box({},'Rambabu'),box({},'Arabandi')),
    box({fontSize:25,lineHeight:1.4,color:'#b7cbd3',maxWidth:620,marginTop:24},'Production voice AI, agentic systems & developer tooling.'),
    box({gap:10,marginTop:27},...['Voice AI','GraphRAG','MCP tooling'].map(label=>box({fontSize:16,color:'#9ddbcf',border:'1px solid #34514e',borderRadius:25,padding:'9px 17px'},label))),
    box({marginTop:'auto',fontSize:16,color:'#7e9fa8'},'rambabu-143.github.io/My-portfolio')
  ),
  box({position:'absolute',right:55,top:160,width:345,height:300,border:'1px solid #3d645f',borderRadius:18,background:'#0a1720',flexDirection:'column',padding:25,transform:'rotate(-5deg)'},
    box({gap:7,marginBottom:28},...['#4b9d87','#438694','#638a9e'].map(color=>box({width:9,height:9,borderRadius:9,background:color}))),
    box({fontSize:15,color:'#6ee7b7',marginBottom:18},'> building production AI'),
    box({fontSize:58,fontWeight:700,color:'#f0fbff'},'500+'),
    box({fontSize:17,color:'#9ab5c3',marginBottom:27},'daily calls on a voice agent'),
    box({height:1,background:'#2c4752',marginBottom:19}),
    box({fontSize:14,color:'#7caba6'},'Python / TypeScript / Go'),
    box({fontSize:14,color:'#7caba6',marginTop:10},'RAGAS / DeepEval')
  )
);
(async()=>{
 const response=new ImageResponse(image,{width:1200,height:630});
 fs.writeFileSync(path.join(__dirname,'../public/social-preview.png'),Buffer.from(await response.arrayBuffer()));
 console.log('Created public/social-preview.png (1200 × 630)');
})();
