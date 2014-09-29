azure-idle-test
===============

Simple app to reproduce error we are having with Azure SQL DB:
**Connection is not responding after being idle for 4-5 minutes**

The app is opening a single connection to DB and uses it to make simple requests.
Requests are made immediately, in 1 minute, in 2, 3, 4.
After being idle for 4 minutes, connection stopped to return any result.
Even after ATTENTION message have been sent by a driver, nothing changed.


The output of the application:
<pre>
    node index.js
    00:00 TDS	connected to u75hzci8pr.database.windows.net:1433
    00:00 TDS	State change: Connecting -> SentPrelogin
    00:00 TDS	State change: SentPrelogin -> SentTLSSSLNegotiation
    00:00 TDS	TLS negotiated (RC4-MD5, TLSv1/SSLv3)
    00:00 TDS	State change: SentTLSSSLNegotiation -> SentLogin7WithStandardLogin
    00:00 TDS	Packet size changed from 4096 to 4096
    00:00 TDS	State change: SentLogin7WithStandardLogin -> LoggedInSendingInitialSql
    00:00 TDS	State change: LoggedInSendingInitialSql -> LoggedIn
    00:00 >>>	select getdate()
    00:00 TDS	State change: LoggedIn -> SentClientRequest
    00:00 &lt;&lt;&lt;	Mon Sep 29 2014 12:06:33 GMT+0200 (CEST)
    00:00 TDS	State change: SentClientRequest -> LoggedIn
    01:00 >>>	select getdate()
    01:00 TDS	State change: LoggedIn -> SentClientRequest
    01:00 &lt;&lt;&lt;	Mon Sep 29 2014 12:07:34 GMT+0200 (CEST)
    01:00 TDS	State change: SentClientRequest -> LoggedIn
    03:00 >>>	select getdate()
    03:00 TDS	State change: LoggedIn -> SentClientRequest
    03:00 &lt;&lt;&lt;	Mon Sep 29 2014 12:09:34 GMT+0200 (CEST)
    03:00 TDS	State change: SentClientRequest -> LoggedIn
    06:00 >>>	select getdate()
    06:00 TDS	State change: LoggedIn -> SentClientRequest
    06:00 &lt;&lt;&lt;	Mon Sep 29 2014 12:12:34 GMT+0200 (CEST)
    06:00 TDS	State change: SentClientRequest -> LoggedIn
    10:00 >>>	select getdate()
    10:00 TDS	State change: LoggedIn -> SentClientRequest
    10:15 TDS	State change: SentClientRequest -> SentAttention
</pre>

Project also contains the TCP capture info from Wireshart (*idletest.pcap*). It's easy to see, server is not returning any result for a last request.
