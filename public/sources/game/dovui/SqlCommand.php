<?php
/*include('../../../mysql_connect.php');
session_start();
$id=$_GET['id'];
$user_id=$_GET['user_id'];
$user_name=$_GET['user_name'];
$score=$_GET['score'];
$score_rs=-1;
if($id==0)
{
    $query="SELECT score FROM dovui WHERE user_id='$user_id'";
    $result= mysql_query($query);
    while ($row = mysql_fetch_array($result)) {
        $score_rs=$row['score'];
    }
    if($score_rs==-1)
    {
        $query="INSERT INTO dovui(user_id,user_name,score) VALUES ('$user_id','$user_name',1)";
        mysql_query($query);
        $_SESSION['score']=1;
        echo(1);
    }
    else{
        $_SESSION['score']=$score_rs;
        echo($score_rs);
    }
}

if($id==2)
{
        $rank=0;
        $query="SELECT COUNT(id) FROM dovui WHERE score>=$score";
        $result= mysql_query($query);
        while ($row = mysql_fetch_array($result)) {
           $rank=$row['COUNT(id)'];
        }
        echo($rank);
}

if($id==3)
{
    $rs="";
    $query = "SELECT score,user_id,user_name FROM dovui ORDER BY score DESC LIMIT 10 ";
    $result = mysql_query($query);
    if($result){
            while($row = mysql_fetch_array($result)){
                    $score=$row['score'];
                    $user_id=$row['user_id'];
                    $user_name=$row['user_name'];
                    $rs.="<div class='row'><img class='top_img' src='http://graph.facebook.com/".$user_id."/picture'/><a class='top_name' href='https://www.facebook.com/".$user_id."' target='_blank'>".$user_name."</a><div class='top_score'>".$score."</div></div>";
            }
            echo "<div class='top' style='background: rgba(0,0,0,0.6);'><div class='top_view'><div class='top_header'>Tuần</div>".$rs."</div></div>";            
    }
}
*/
?>