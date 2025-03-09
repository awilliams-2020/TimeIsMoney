package com.timeismoney

import android.content.Intent
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig
import com.facebook.react.jstasks.HeadlessJsTaskRetryPolicy
import com.facebook.react.jstasks.LinearCountingRetryPolicy
import android.util.Log
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import androidx.core.app.ServiceCompat

class AuthTaskService : HeadlessJsTaskService() {
    override fun getTaskConfig(intent: Intent): HeadlessJsTaskConfig? {
        val retryPolicy: HeadlessJsTaskRetryPolicy =
            LinearCountingRetryPolicy(
                3,
                1000
            )
        return HeadlessJsTaskConfig(
            "BackgroundManager",
            Arguments.createMap(),
            5000, // timeout for the task
            true,
            retryPolicy
        )
    }

    private val CHANNEL_ID = "MyForegroundServiceChannel"
    private val NOTIFICATION_ID = 1

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        val notification: Notification = buildNotification()
        try {
            ServiceCompat.startForeground(this, NOTIFICATION_ID, notification, ServiceCompat.START_STICKY)
        } catch (e: Exception) {
            Log.d("ReactNativeJS", e.toString())
        }
    } 
 
    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "My Foreground Service Channel",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(serviceChannel)
        }
    }
 
     private fun buildNotification(): Notification {
         return NotificationCompat.Builder(this, CHANNEL_ID)
             .setContentTitle("Foreground Service")
             .setContentText("Service is running in the foreground")
             .setSmallIcon(android.R.drawable.ic_menu_mylocation)
             .build()
     }
 
     override fun onDestroy() {
         super.onDestroy()
         ServiceCompat.stopForeground(this,ServiceCompat.STOP_FOREGROUND_DETACH )
     }
}
