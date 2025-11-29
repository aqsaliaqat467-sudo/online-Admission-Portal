import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
    collection,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../Firebase";

const ChatList = () => {
  const user = useSelector((state) => state.home.user);
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    // Query all chats where current user is involved
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("users", "array-contains", user.uid));

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const chatsData = await Promise.all(
          snapshot.docs.map(async (chatDoc) => {
            const chatData = chatDoc.data();
            const otherUserId = chatData.users.find((id) => id !== user.uid);

            // Get last message
            const messagesRef = collection(db, "chats", chatDoc.id, "messages");
            const lastMessageQuery = query(
              messagesRef,
              orderBy("createdAt", "desc"),
              limit(1)
            );
            const lastMessageSnapshot = await getDocs(lastMessageQuery);
            let lastMessage = null;
            if (!lastMessageSnapshot.empty) {
              const msgDoc = lastMessageSnapshot.docs[0];
              lastMessage = {
                text: msgDoc.data().text,
                createdAt: msgDoc.data().createdAt,
                senderId: msgDoc.data().senderId,
              };
            }

            // Get other user's name from chat document's userNames object
            const otherUserName = chatData.userNames?.[otherUserId] || "User";

            return {
              id: chatDoc.id,
              chatId: chatData.chatId,
              otherUserId,
              otherUserName,
              lastMessage,
              createdAt: chatData.createdAt,
            };
          })
        );

        // Sort by last message time (most recent first)
        chatsData.sort((a, b) => {
          const timeA = a.lastMessage?.createdAt?.toMillis?.() || 0;
          const timeB = b.lastMessage?.createdAt?.toMillis?.() || 0;
          return timeB - timeA;
        });

        setChats(chatsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to chats:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch {
      return "";
    }
  };

  const handleChatPress = (chat) => {
    navigation.navigate("Chat", {
      currentUserId: user.uid,
      otherUserId: chat.otherUserId,
      otherUserName: chat.otherUserName,
    });
  };

  const renderChatItem = ({ item }) => {
    const isCurrentUserSender = item.lastMessage?.senderId === user.uid;
    const messagePreview = item.lastMessage?.text || "No messages yet";
    const timestamp = formatTimestamp(item.lastMessage?.createdAt);

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => handleChatPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={50} color="#538cc6" />
        </View>
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName} numberOfLines={1}>
              {item.otherUserName}
            </Text>
            {timestamp ? (
              <Text style={styles.timestamp}>{timestamp}</Text>
            ) : null}
          </View>
          <Text
            style={styles.messagePreview}
            numberOfLines={1}
          >
            {isCurrentUserSender && item.lastMessage ? "You: " : ""}
            {messagePreview}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color="#538cc6" />
          <Text style={styles.emptyStateText}>Loading chats...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Ionicons name="chatbubbles-outline" size={64} color="#bbb" />
        <Text style={styles.emptyStateText}>No conversations yet</Text>
        <Text style={styles.emptyStateSubtext}>
          Start a conversation to see it here
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={
          chats.length === 0 ? styles.emptyList : styles.list
        }
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f3f8",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#538cc6",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  list: {
    paddingVertical: 8,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 4,
    borderRadius: 12,
    elevation: 1,
  },
  avatarContainer: {
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1c1b1f",
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: "#6c757d",
    marginLeft: 8,
  },
  messagePreview: {
    fontSize: 14,
    color: "#6c757d",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#888",
  },
  emptyStateSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: "#aaa",
  },
  emptyList: {
    flexGrow: 1,
  },
});

export default ChatList;