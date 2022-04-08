import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";

import MessageContainer from './MessageContainer';
import MessagesSidebar from './MessagesSidebar';

import { threads } from './fakeThreads.js';


const MessagePage = () => {

    return (
        <div>
            {/* <div>
                <MessagesSidebar />
            </div> */}

            <div>
                <MessageContainer threads={threads} />
            </div>
        </div>
    );
}

export default MessagePage;
