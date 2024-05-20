import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onCreateUserTrigger = functions.firestore.document('users/{userId}')
  .onCreate(async (snapshot, context) => {
    const userId = context.params.userId
    const incrementId = await getNextIncrementId('users');
    await snapshot.ref.update({ increment_id: incrementId });
    console.log(`Increment_id ${incrementId} definido para o usuário com ID ${userId}`);
  });

const getNextIncrementId = async (collectionPath: string): Promise<number> => {
  const counterRef = admin.firestore().collection('counters').doc(collectionPath);

  return admin.firestore().runTransaction(async (transaction: any) => {
    const counterDoc = await transaction.get(counterRef);
    
    if (!counterDoc.exists) {
      transaction.set(counterRef, { count: 0 });
    }

    const currentCount = counterDoc.exists ? counterDoc.data()?.count || 0 : 0;
    const nextCount = currentCount + 1;
    transaction.update(counterRef, { count: nextCount });
    return nextCount;
  });
};