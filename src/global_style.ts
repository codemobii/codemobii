import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
html,body{
  background: #2C254A;
}
input[type=number]::-webkit-inner-spin-button {
  opacity: 0;
}
input[type=number]:hover::-webkit-inner-spin-button,
input[type=number]:focus::-webkit-inner-spin-button {
  opacity: 0.25;
}
/* width */
::-webkit-scrollbar {
  width: 15px;
}
/* Track */
::-webkit-scrollbar-track {
  background: #2d313c;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #5b5f67;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5b5f67;
}
.ant-slider-track, .ant-slider:hover .ant-slider-track {
  background-color: #53e1e1;
  opacity: 0.75;
}
.ant-slider-track,
.ant-slider ant-slider-track:hover {
  background-color: #53e1e1;
  opacity: 0.75;
}
.ant-slider-dot-active,
.ant-slider-handle,
.ant-slider-handle-click-focused,
.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open)  {
  border: 2px solid #53e1e1; 
}
.ant-table-tbody > tr.ant-table-row:hover > td {
  background: #273043;
}
.ant-table-tbody > tr > td {
  border-bottom: 8px solid #2C254A;
}
.ant-table-container table > thead > tr:first-child th {
  border-bottom: none;
}
.ant-divider-horizontal.ant-divider-with-text::before, .ant-divider-horizontal.ant-divider-with-text::after {
  border-top: 1px solid #434a59 !important;
}
.ant-layout {
    background: #2C254A
  }
  .ant-table {
    background: #212734;
    border-radius: 0px;
  }
  .ant-table-thead > tr > th {
    background: #2C254A;
    border-radius: 0px;
  }
.ant-select-item-option-content {
  img {
    margin-right: 4px;
  }
}
.ant-modal-content {
  background-color: #212734;
}

@-webkit-keyframes highlight {
  from { background-color: #53e1e1;}
  to {background-color: #2C254A;}
}
@-moz-keyframes highlight {
  from { background-color: #53e1e1;}
  to {background-color: #2C254A;}
}
@-keyframes highlight {
  from { background-color: #53e1e1;}
  to {background-color: #2C254A;}
}
.flash {
  -moz-animation: highlight 0.5s ease 0s 1 alternate ;
  -webkit-animation: highlight 0.5s ease 0s 1 alternate;
  animation: highlight 0.5s ease 0s 1 alternate;
}
.ant-input { 
    border-radius: 10px;
  }

`;
