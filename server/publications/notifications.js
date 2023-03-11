import { ReactiveCache } from '/imports/reactiveCache';

// We use these when displaying notifications in the notificationsDrawer

// gets all activities associated with the current user
Meteor.publish('notificationActivities', () => {
  const ret = activities();
  return ret;
});

// gets all attachments associated with activities associated with the current user
Meteor.publish('notificationAttachments', function() {
  const ret = Attachments.find({
    _id: {
      $in: activities()
        .map(v => v.attachmentId)
        .filter(v => !!v),
    }.cursor,
  });
  return ret;
});

// gets all cards associated with activities associated with the current user
Meteor.publish('notificationCards', function() {
  const ret = Cards.find({
    _id: {
      $in: activities()
        .map(v => v.cardId)
        .filter(v => !!v),
    },
  });
  return ret;
});

// gets all checklistItems associated with activities associated with the current user
Meteor.publish('notificationChecklistItems', function() {
  const ret = ChecklistItems.find({
    _id: {
      $in: activities()
        .map(v => v.checklistItemId)
        .filter(v => !!v),
    },
  });
  return ret;
});

// gets all checklists associated with activities associated with the current user
Meteor.publish('notificationChecklists', function() {
  const ret = Checklists.find({
    _id: {
      $in: activities()
        .map(v => v.checklistId)
        .filter(v => !!v),
    },
  });
  return ret;
});

// gets all comments associated with activities associated with the current user
Meteor.publish('notificationComments', function() {
  const ret = CardComments.find({
    _id: {
      $in: activities()
        .map(v => v.commentId)
        .filter(v => !!v),
    },
  });
  return ret;
});

// gets all lists associated with activities associated with the current user
Meteor.publish('notificationLists', function() {
  const ret = Lists.find({
    _id: {
      $in: activities()
        .map(v => v.listId)
        .filter(v => !!v),
    },
  });
  return ret;
});

// gets all swimlanes associated with activities associated with the current user
Meteor.publish('notificationSwimlanes', function() {
  const ret = Swimlanes.find({
    _id: {
      $in: activities()
        .map(v => v.swimlaneId)
        .filter(v => !!v),
    },
  });
  return ret;
});

// gets all users associated with activities associated with the current user
Meteor.publish('notificationUsers', function() {
  const ret = Users.find({
    _id: {
      $in: activities()
        .map(v => v.userId)
        .filter(v => !!v),
    },
  });
  return ret;
});

function activities() {
  const activityIds = ReactiveCache.getCurrentUser()?.profile?.notifications?.map(v => v.activity) || [];
  let ret = [];
  if (activityIds.length > 0) {
    ret = Activities.find({
      _id: { $in: activityIds },
    });
  return ret;
  }
}
